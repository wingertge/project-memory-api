import {AuthenticationError} from "apollo-server"
import {v2 as cloudinary} from "cloudinary"
import debug from "debug"
import {fieldsMap} from "graphql-fields-list"
import {Resolvers, User} from "../../generated/graphql"
import Auth from "../auth/Auth"
import AuthError, {ErrorType} from "../AuthError"
import makeLogger from "../logging"
import project from "../project"
import {escapeRegExp, validateUser} from "../validators"
import DBUser from "./user.model"

const log = debug("api:topicResolvers:user")
log.log = console.log.bind(console)
const logger = makeLogger("resolvers.user")

const isSocial = (user: Pick<User, "identities">) => !user.identities!.some(identity => !identity!.isSocial)

const resolvers: Resolvers = {
    Query: {
        user: async (_, {id}, {user}, info) => {
            if(!user)
                return null
            logger.debug("Starting Query")
            const dbUser = await project(DBUser, DBUser.findById(id), info) as any
            logger.debug("Finished Query")
            if(!dbUser && user.id === id) {
                logger.debug(`Initialising user ${id}`)
                const newUser = await new Auth().findUserById(id)
                return await project(DBUser, DBUser.findByIdAndUpdate(id, {...newUser, isSocial: isSocial(newUser)}, {new: true, upsert: true}), info) as any
            }
            logger.debug(dbUser)
            return (dbUser || {id}) as User
        },
        users: async (_, {filter}, {user}, info) => {
            if(!user) return []
            filter = filter || {}
            if(!filter.search && !filter.limit) return []
            if(filter.search && filter.search.length < 3) return []

            const find = filter.search ? {$or: [{username: new RegExp(escapeRegExp(filter.search), "i")}, {email: filter.search}]} : {}
            const q = filter.limit ? DBUser.find(find).limit(filter.limit) : DBUser.find(find)

            logger.debug("Starting user search")
            const users = await project(DBUser, q, info) as any
            logger.debug("Finished user search")
            return users
        }
    },
    Mutation: {
        changeFollowingStatus: async (_, {id, followerID, value}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            if(user.id !== followerID) throw new AuthError(ErrorType.Unauthorized)
            if(followerID === id) throw new Error("You can't follow yourself silly.")
            if(value) {
                await DBUser.updateOne({_id: followerID, following: {$ne: id}}, {$push: {following: id}})
            } else {
                await DBUser.updateOne({_id: followerID}, {$pull: {following: id}})
            }
            return await project(DBUser, DBUser.findById(id), info) as any
        },
        async editUser(_, {id, input}, {user}, info) {
            log(input)
            logger.info(input)
            if (!user || user.id !== id)
                throw new AuthenticationError("You don't have permission to edit that profile.")

            validateUser(input)

            const extra: any = {}

            if((input.email || input.password)) {
                const currentUser = await DBUser.findById(id).select("email")
                if(currentUser!.email !== input.email || input.password) {
                    const auth = new Auth()
                    const authUser = await auth.findUserById(id)

                    if (isSocial(authUser)) {
                        if (input.password) {
                            await auth.addDatabaseIdentity(id, authUser.email!, input.password)
                            extra.isSocial = false
                        }
                    } else {
                        if (input.password) {
                            if (!input.oldPassword)
                                throw new AuthenticationError("Must provide old password to verify")
                            await auth.updatePassword(id, input.password, input.oldPassword)
                        }

                        if (input.email && input.email !== currentUser!.email)
                            await auth.updateEmail(id, input.email!)
                    }
                }
            }

            log(fieldsMap(info))

            const dbUser = await project(DBUser, DBUser.findByIdAndUpdate(id, {...input}, {new: true}), info)

            log(dbUser)
            return dbUser as any
        },
        uploadProfilePicture: async (_, {userId, file}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            if(user.id !== userId) throw new AuthError(ErrorType.Unauthorized)

            const {createReadStream, mimetype} = await file
            if(!mimetype.startsWith("image/")) throw new Error("Invalid Mime Type")

            try {
                const image = await new Promise<{public_id: string, format: string}>(accept => {
                    const uploadStream = cloudinary.uploader.upload_stream({
                        crop: "fill", width: 256, height: 256,
                        format: "png", gravity: "face"
                    }, (error, result) => {
                        if(error) throw new Error(JSON.stringify(error, null, 2))
                        accept(result)
                    })
                    createReadStream().pipe(uploadStream)
                })
                const {public_id, format} = image
                const baseUrl = process.env.CLOUDINARY_BASE_URL!
                const newPictureUrl = `${baseUrl}${public_id}.${format}`
                const user = await DBUser.findById(userId).select("picture")
                if(user!.picture.startsWith(baseUrl)) {
                    let publicId = user!.picture.replace(baseUrl, "")
                    publicId = publicId.substring(0, publicId.lastIndexOf("."))
                    cloudinary.uploader.destroy(publicId)
                }
                return await project(DBUser, DBUser.findByIdAndUpdate(userId, {picture: newPictureUrl}, {new: true}), info) as any
            } catch (e) {
                throw new Error(e)
            }
        }
    },
    User: {
        email: ({id, email}, _, {user}) => user.id === id ? email! : null,
        gender: ({id, gender}, _, {user}) => user.id === id ? gender! : null,
        identities: ({id, identities}, _, {user}) => user.id === id ? identities! : null,
        locale: ({id, locale}, _, {user}) => user.id === id ? locale! : null,
        isSocial: ({id, isSocial}, _, {user}) => user.id === id ? isSocial : false,
        name: ({id, name}, _, {user}) => user.id === id ? name! : null,
        isFollowedBy: async ({id}, {id: followerID}, {user}) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            if(user.id !== followerID) throw new AuthError(ErrorType.Unauthorized)

            const result = await DBUser.find({_id: followerID, following: id}).select("_id")
            return result.length > 0
        }
    }
}

export default resolvers

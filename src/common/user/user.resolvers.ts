import {AuthenticationError} from "apollo-server"
import debug from "debug"
import {fieldsMap} from "graphql-fields-list"
import {Resolvers, User} from "../../generated/graphql"
import Auth from "../auth/Auth"
import AuthError, {ErrorType} from "../AuthError"
import makeLogger from "../logging"
import project from "../project"
import {validateUser} from "../validators"
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
        }
    },
    Mutation: {
        changeFollowingStatus: async (_, {id, followID, value}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            if(user.id !== id) throw new AuthError(ErrorType.Unauthorized)
            if(value) {
                await DBUser.updateOne({_id: id, following: {$ne: followID}}, {$push: {following: followID}})
            } else {
                await DBUser.updateOne({_id: id}, {$pull: {following: followID}})
            }
            return await project(DBUser, DBUser.findById(id), info) as any
        },
        async editUser(_, {id, input}, {user}, info) {
            log(input)
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
        }
    },
    User: {
        email: ({id, email}, _, {user}) => user.id === id ? email! : null,
        gender: ({id, gender}, _, {user}) => user.id === id ? gender! : null,
        identities: ({id, identities}, _, {user}) => user.id === id ? identities! : null,
        locale: ({id, locale}, _, {user}) => user.id === id ? locale! : null,
        isSocial: ({id, isSocial}, _, {user}) => user.id === id ? isSocial : false,
        name: ({id, name}, _, {user}) => user.id === id ? name! : null
    }
}

export default resolvers

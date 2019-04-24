import {fieldsMap} from "graphql-fields-list"
import {Deck, Resolvers, User} from "../../generated/graphql"
import {AuthenticationError} from "apollo-server"
import debug from "debug"
import Auth from "../auth/Auth"
import project from "../project"
import DBUser from "./user.model"

const log = debug("api:topicResolvers:user")
log.log = console.log.bind(console)

const isSocial = (user: Pick<User, "identities">) => !user.identities!.some(identity => !identity!.isSocial)

const resolvers: Resolvers = {
    Query: {
        user: async (_, {id}, {user}, info) => {
            if(!user)
                return null
            log("id: " + id)
            log(fieldsMap(info))
            log("Starting Query")
            const dbUser = await project(DBUser, DBUser.findById(id), info).exec()
            log("Finished Query")
            log(dbUser)
            return (dbUser || {id}) as User
        }
    },
    Mutation: {
        async updateDeck(_, {id, input}, {user}) {
            if(!user)
                throw new AuthenticationError("Must be logged in to do that")
            log(`Updating deck ${id} with data ${JSON.stringify(input)}`)
            return {id, name: input.name} as Deck
        },
        initUser: async (_, {id}, {}, info) => {
            //Add permission verification
            log(`Initialising user ${id}`)
            const user = await new Auth().findUserById(id)
            return await project(DBUser, DBUser.findByIdAndUpdate(id, {...user, isSocial: isSocial(user)}, {new: true, upsert: true}), info) as any
        },
        async editUser(_, {id, input}, {user}, info) {
            log(input)
            if (!user || user.id !== id)
                throw new AuthenticationError("You don't have permission to edit that profile.")

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

            const dbUser = await project(DBUser, DBUser.findByIdAndUpdate(id, {...input}, {new: true}), info).exec()

            log(dbUser)
            return dbUser as any
        }
    }
}

export default resolvers

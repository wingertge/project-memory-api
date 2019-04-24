import {AuthenticationError} from "apollo-server"
import debug from "debug"
import {Resolvers} from "../../generated/graphql"
import project from "../project"
import DBUser from "../user/user.model"
import DBLanguage from "./language.model"

const log = debug("api:topicResolvers:language")
log.log = console.log.bind(console)


const resolvers: Resolvers = {
    Query: {
        languages: async (a, b, c, info) => {
            const langs = await project(DBLanguage, DBLanguage.find({}), info) as any
            log(langs)
            return langs
        },
        language: async (a, {languageCode}, b, info) => {
            return await project(DBLanguage, DBLanguage.findOne({languageCode}), info) as any
        }
    },
    Mutation: {
        addLanguageToUser: async (_, {id, input}, {user}, info) => {
            if(!user || user.id !== id)
                throw new AuthenticationError("You're not authorized to do that")
            log(input)
            const dbUser = await project(DBUser, DBUser.findByIdAndUpdate(id, {$push: {languages: input}}, {new: true}), info) as any
            log(dbUser)
            return dbUser
        },
        removeLanguageFromUser: async (_, {id, language}, {user}, info) => {
            if(!user || user.id !== id)
                throw new AuthenticationError("You're not authorized to do that")
            const dbUser = await project(DBUser, DBUser.findByIdAndUpdate(id, {$pull: {languages: language}}, {new: true}), info) as any
            log(dbUser)
            return dbUser
        }
    }
}

export default resolvers

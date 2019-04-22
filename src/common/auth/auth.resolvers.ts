import {Resolvers} from "../../generated/graphql"
import {AppContext} from "../server"
import Auth from "./Auth"

const resolvers: Resolvers<AppContext> = {
    User: {
        identities: async ({id}, _, {user}) => user.id === id ? (await new Auth().findUserById(id)).identities! : null
    },
    Mutation: {
        async authenticate(_, {code}) {
            return await new Auth().authenticate(code)
        }
    }
}


export default resolvers

import {Resolvers} from "../../generated/graphql"
import {AppContext} from "../server"
import debug from "debug"
import Auth from "./Auth"

//const log = debug("api:resolvers:auth")

/*const stripSensitive = (user: Partial<User>): Partial<User> => ({
    id: user.id,
    username: user.username,
    picture: user.picture,
    gender: user.gender
})*/

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

import {Resolvers} from "../../generated/graphql"
import makeLogger from "../logging"
import {AppContext} from "../server"
import Auth from "./Auth"
import debug from "debug"

const log = debug("api:auth")
log.log = console.log.bind(console)
const logger = makeLogger("auth.resolvers")

const resolvers: Resolvers<AppContext> = {
    User: {
        identities: async ({id}, _, {user}) => user.id === id ? (await new Auth().findUserById(id)).identities! : null
    },
    Mutation: {
        async authenticate(_, {code}) {
            logger.debug("Authenticating...")
            return await new Auth().authenticate(code)
        }
    }
}


export default resolvers

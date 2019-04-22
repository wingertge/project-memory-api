import {ApolloServer} from "apollo-server-express"
import {GraphQLScalarType, Kind} from "graphql"
import {importSchema} from "graphql-import"
import {makeExecutableSchema} from "graphql-tools"
import jwt from "express-jwt"
import jwks from "jwks-rsa"
import express from "express"
import cookieParser from "cookie-parser"
import {connect} from "mongoose"
import authResolvers from "./auth/auth.resolvers"
import postResolvers from "./post/post.resolvers"
import userResolvers from "./user/user.resolvers"
import deckResolvers from "./deck/deck.resolvers"
import languageResolvers from "./language/language.resolvers"
import cardResolvers from "./card/card.resolvers"
import reviewResolvers from "./review/review.resolvers"
import cors from "cors"
import debug from "debug"
import {Resolvers} from "../generated/graphql"
//import DBLanguage from "./language/language.model"
import "./language/language.model"


const log = debug("api:server")
log.log = console.log.bind(console)
//const logError = debug("api:server:error")

connect(
    process.env.MONGODB_URI || "",
    {useNewUrlParser: true}
)

const rootSchema = importSchema("./src/schemas/api.graphql")
const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWKS_URL!
    }),
    audience: process.env.ENDPOINT_URL!,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ["RS256"],
    credentialsRequired: false
})

const scalarResolvers: Resolvers = {
    Date: new GraphQLScalarType({
        name: "Date",
        description: "Represents a date in time",
        parseValue(value: string) {
            return new Date(value)
        },
        serialize(value: Date) {
            return value.toISOString()
        },
        parseLiteral(ast) {
            if(ast.kind === Kind.INT || ast.kind === Kind.STRING) {
                return new Date(ast.value)
            }
            return null
        }
    })
}

const schema = makeExecutableSchema({
    typeDefs: [rootSchema],
    resolvers: [
        scalarResolvers, authResolvers, userResolvers,
        deckResolvers, languageResolvers, cardResolvers,
        reviewResolvers, postResolvers
    ] as any
})

export interface AppContext {
    user: User
}

interface User {
    id: string
}

const convertUser = (user: any): User => ({
    id: user["https://project-memory.com/id"]
})

const server = new ApolloServer({
    schema,
    context: async ({req}) => ({
        user: req.user && convertUser(req.user)
    }),
    formatError(error) {
        log(JSON.stringify(error, null, 2))
        return error
    },
    formatResponse(response) {
        log(JSON.stringify(response, null, 2))
        return response
    },
    engine: {
        apiKey: process.env.ENGINE_API_KEY,
        generateClientInfo: ({request}) => {
            const headers = request!.http && request!.http.headers
            if(headers) {
                return {
                    clientName: headers["apollo-client-name"],
                    clientVersion: headers["apollo-client-version"]
                }
            } else {
                return {
                    clientName: "Unknown Client",
                    clientVersion: "Unversioned"
                }
            }
        }
    }
})

const app = express()
app
    .disable("x-powered-by")
    .use(jwtCheck)
    .use(cookieParser(process.env.COOKIE_SIGNING_SECRET!))
    .use(cors({origin: "*"}))
    .use((err, req, res, next) => {
        if(err.name === "UnauthorizedError") {
            res.status(200).send(JSON.stringify({
                errors: [{message: err.message}]
            }))
            log(err)
            return
        }
        next()
    })

server.applyMiddleware({app, path: "/", cors: true})

/*const allLangs = [
    {name: "German", nativeName: "Deutsch", languageCode: "de-DE"},
    {name: "UK English", nativeName: "English", languageCode: "en-GB"},
    {name: "US English", nativeName: "English", languageCode: "en-US"},
    {name: "Japanese", nativeName: "日本語", languageCode: "jp-JP"}
]

allLangs.forEach(language => {
    new DBLanguage(language).save()
})*/

export {app, server}
export default app

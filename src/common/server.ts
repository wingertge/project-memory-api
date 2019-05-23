import {HttpLink} from "apollo-link-http"
import {ApolloServer, introspectSchema, makeRemoteExecutableSchema, mergeSchemas} from "apollo-server-express"
import {GraphQLScalarType, Kind} from "graphql"
import {makeExecutableSchema} from "graphql-tools"
import jwt from "express-jwt"
import jwks from "jwks-rsa"
import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authResolvers from "./auth/auth.resolvers"
import {cloudFunctionFix} from "./cloudFunctionFix"
import issueResolvers from "./issue/issue.resolvers"
import makeLogger from "./logging"
import postResolvers from "./post/post.resolvers"
import tagResolvers from "./tag/tag.resolvers"
import userResolvers from "./user/user.resolvers"
import deckResolvers from "./deck/deck.resolvers"
import languageResolvers from "./language/language.resolvers"
import cardResolvers from "./card/card.resolvers"
import reviewResolvers from "./review/review.resolvers"
import cors from "cors"
import debug from "debug"
import {Resolvers} from "../generated/graphql"
import cloudinary from "cloudinary"
//import DBLanguage from "./language/language.model"
import "./language/language.model"
import fetch from "node-fetch"


const log = debug("api:server")
log.log = console.log.bind(console)
const logError = debug("api:server:error")
const logger = makeLogger("server")

export interface AppContext {
    user: User
}

interface User {
    id: string
}

export const createApp = async (rootSchema: string) => {
    mongoose.connect(
        process.env.MONGODB_URI || "",
        {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    )
    mongoose.set("toObject", {virtuals: true})
    mongoose.set("toJSON", {virtuals: true})

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
            serialize(value: Date | string) {
                return typeof value !== "string" ? value.toISOString() : new Date(value).toISOString()
            },
            parseLiteral(ast) {
                if(ast.kind === Kind.INT || ast.kind === Kind.STRING) {
                    return new Date(ast.value)
                }
                return null
            }
        })
    }

    const localSchema = makeExecutableSchema({
        typeDefs: [rootSchema],
        resolvers: [
            scalarResolvers, authResolvers, userResolvers,
            deckResolvers, languageResolvers, cardResolvers,
            reviewResolvers, postResolvers, tagResolvers,
            issueResolvers
        ] as any
    })

    const cmsLink = new HttpLink({
        uri: process.env.CMS_ENDPOINT_URL,
        headers: {
            authorization: `Bearer ${process.env.CMS_ACCESS_TOKEN}`
        },
        fetch
    })
    const cmsSchema = await introspectSchema(cmsLink)
    const executableCmsSchema = makeRemoteExecutableSchema({schema: cmsSchema, link: cmsLink})

    const schema = mergeSchemas({
        schemas: [
            executableCmsSchema,
            localSchema
        ]
    })

    const convertUser = (user: any): User => ({
        id: user["https://project-memory.com/id"]
    })

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })

    const server = new ApolloServer({
        schema,
        context: async ({req}) => ({
            user: req.user && convertUser(req.user)
        }),
        formatError(error) {
            logError(JSON.stringify(error, null, 2))
            //errors.report(error)
            logger.error(error)
            return error
        },
        formatResponse(response) {
            log(JSON.stringify(response, null, 2))
            logger.info(response)
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
        },
        introspection: true
    })

    const app = express()
    app
        .disable("x-powered-by")
        .use(cors({origin: true, credentials: true}))
        .use(jwtCheck)
        .use(cookieParser(process.env.COOKIE_SIGNING_SECRET!))
        .use((err, req, res, next) => {
            if(err && err.name === "UnauthorizedError") {
                res.status(200).send(JSON.stringify({
                    errors: [{message: err.message}]
                }))
                logger.error(err)
                return
            }
            next()
        })
        .use(cloudFunctionFix)

    server.applyMiddleware({app, path: "/", cors: false})

    return {app, server}
}

export default createApp
/*const rootSchema = importSchema("./src/schemas/api.graphql")

/!*const allLangs = [
    {name: "German", nativeName: "Deutsch", languageCode: "de-DE"},
    {name: "UK English", nativeName: "English", languageCode: "en-GB"},
    {name: "US English", nativeName: "English", languageCode: "en-US"},
    {name: "Japanese", nativeName: "日本語", languageCode: "jp-JP"}
]

allLangs.forEach(language => {
    new DBLanguage(language).save()
})*!/

export {app, server}
export default app*/

import * as dotenv from "dotenv"
dotenv.config() // This needs to be before all other imports so process.env is set up

import {app} from "./common/server"
import awsExpress from "aws-serverless-express"

const server = awsExpress.createServer(app)

const handler = (event, context) => {
    awsExpress.proxy(server, event, context)
}

// noinspection JSUnusedGlobalSymbols
export const graphQLHandler = (event, context) => {
    return handler(event, context)
}

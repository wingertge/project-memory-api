import * as dotenv from "dotenv"
dotenv.config() // This needs to be before all other imports so process.env is set up

import createApp from "./common/server"
import schema from "./schemas/api-serverless.graphql"
const serverPromise = createApp(schema)

// noinspection JSUnusedGlobalSymbols
export const graphql = async (req, res) => {
    const server = await serverPromise
    return server.app(req, res)
}

import * as dotenv from "dotenv"
dotenv.config() // This needs to be before all other imports so process.env is set up

import createApp from "./common/server"
import schema from "./schemas/api.graphql"
const app = createApp(schema).app

// noinspection JSUnusedGlobalSymbols
export const graphql = app

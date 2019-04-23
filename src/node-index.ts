import * as dotenv from "dotenv"
import {importSchema} from "graphql-import"
dotenv.config() // This needs to be before all other imports so process.env is set up

import createApp from "./common/server"

const {app, server} = createApp(importSchema("./src/schemas/api.graphql"))

app.listen({port: process.env.PORT || 4000}, () => {
    console.log(`🚀  Server ready at ${process.env.ENDPOINT_URL}:${process.env.PORT || 4000}${server.graphqlPath}`)
})

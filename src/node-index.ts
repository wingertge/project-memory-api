import * as dotenv from "dotenv"
dotenv.config() // This needs to be before all other imports so process.env is set up

import {app, server} from "./common/server"

app.listen({port: process.env.PORT || 4000}, () => {
    console.log(`🚀  Server ready at ${process.env.ENDPOINT_URL}:${process.env.PORT || 4000}${server.graphqlPath}`)
})

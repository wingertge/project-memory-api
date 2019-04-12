import * as dotenv from "dotenv"
dotenv.config() // This needs to be before all other imports so process.env is set up

import {app, server} from "./common/server"

app.listen({port: 4000}, () => {
    console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`)
})

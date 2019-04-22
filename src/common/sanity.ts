import CreateSanityClient from "@sanity/client"

let sanityClient = null

interface SanityClient {
    fetch: <T>(query: string, params?: {[P: string]: any}) => Promise<T[]>
    getDocument: <T>(id: string) => Promise<T>
}

export const sanity = () => {
    if(!sanityClient) {
        sanityClient = new CreateSanityClient({
            projectId: process.env.SANITY_PROJECT_ID,
            dataset: process.env.SANITY_DATASET,
            token: process.env.SANITY_TOKEN,
            useCdn: true
        })
    }
    return sanityClient! as SanityClient
}

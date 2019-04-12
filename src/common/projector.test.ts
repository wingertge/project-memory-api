import test from "ava"
import {rawProjector as projector, DBMappingType} from "./projector"
import debug from "debug"
import DBUser from "./user/user.model"

const log = debug("api:test")
log.log = console.log.bind(console)

test("projector projects reference fields properly", t => {
    const project = projector({
        User: {
            nativeLanguage: {
                name: "nativeLanguage",
                mappingType: DBMappingType.Reference,
                ref: "Language"
            }
        },
        Language: {}
    })

    const referenceQuery = DBUser.findById("asd")
        .select("id").select("email").select("username").select("nativeLanguage").populate({
            path: "nativeLanguage",
            select: "id name",
            populate: []
        })

    const gqlQuery = {
        id: false,
        email: false,
        username: false,
        nativeLanguage: {
            id: false,
            name: false
        }
    }

    const autoQuery = project("User", DBUser.findById("asd"), gqlQuery)

    t.deepEqual(autoQuery, referenceQuery)
})

test("projector should project reference fields properly", t => {
    const project = projector({
        User: {
            nativeLanguage: {
                name: "nativeLanguage",
                mappingType: DBMappingType.Nested,
                ref: "Language"
            }
        },
        Language: {}
    })

    const referenceQuery = DBUser.findById("asd")
        .select("id").select("email").select("username").select("nativeLanguage").select("nativeLanguage.id").select("nativeLanguage.name")

    const gqlQuery = {
        id: false,
        email: false,
        username: false,
        nativeLanguage: {
            id: false,
            name: false
        }
    }

    const autoQuery = project("User", DBUser.findById("asd"), gqlQuery)

    t.deepEqual(autoQuery, referenceQuery)
})

test("projector should project deep reference fields properly", t => {
    const project = projector({
        User: {
            decks: {
                name: "decks",
                mappingType: DBMappingType.Reference,
                ref: "Deck"
            }
        },
        Deck: {
            language: {
                name: "language",
                mappingType: DBMappingType.Reference,
                ref: "Language"
            },
            nativeLanguage: {
                name: "nativeLanguage",
                mappingType: DBMappingType.Reference,
                ref: "Language"
            }
        },
        Language: {}
    })

    const referenceQuery = DBUser.findById("asd")
        .select("id").select("email").select("username").select("decks").populate({
            path: "decks",
            select: "id language nativeLanguage",
            populate: [{
                path: "language",
                select: "id name nativeName",
                populate: []
            }, {
                path: "nativeLanguage",
                select: "id name nativeName",
                populate: []
            }]
        })

    const gqlQuery = {
        id: false,
        email: false,
        username: false,
        decks: {
            id: false,
            language: {
                id: false,
                name: false,
                nativeName: false
            },
            nativeLanguage: {
                id: false,
                name: false,
                nativeName: false
            }
        }
    }

    const autoQuery = project("User", DBUser.findById("asd"), gqlQuery)

    t.deepEqual(autoQuery, referenceQuery)
})

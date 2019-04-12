import projector, {DBMappingType} from "./projector"

export default projector({
    User: {
        nativeLanguage: {
            name: "nativeLanguage",
            mappingType: DBMappingType.Reference,
            ref: "Language"
        },
        languages: {
            name: "languages",
            mappingType: DBMappingType.Reference,
            ref: "Language"
        },
        ownedDecks: {
            name: "ownedDecks",
            mappingType: DBMappingType.Reference,
            ref: "Deck"
        },
        subscribedDecks: {
            name: "subscribedDecks",
            mappingType: DBMappingType.Reference,
            ref: "Deck"
        },
        reviewQueue: {
            name: "reviewQueue",
            mappingType: DBMappingType.Reference,
            ref: "Review"
        },
        lessonQueue: {
            name: "lessonQueue",
            mappingType: DBMappingType.Reference,
            ref: "Card"
        }
    },
    Language: {},
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
        },
        cards: {
            name: "cards",
            mappingType: DBMappingType.Ignore
        },
        subscribers: {
            name: "subscribers",
            mappingType: DBMappingType.Reference,
            ref: "User"
        },
        ratings: {
            name: "ratings",
            mappingType: DBMappingType.Reference,
            ref: "User"
        },
        owner: {
            name: "owner",
            mappingType: DBMappingType.Reference,
            ref: "User"
        }
    },
    Card: {},
    Review: {
        card: {
            name: "card",
            mappingType: DBMappingType.Reference,
            ref: "Card"
        }
    }
})

import {model, Schema, Document} from "mongoose"
import {Deck} from "../../generated/graphql"
import Card, {DbCard} from "../card/card.model"
import {DbLanguage} from "../language/language.model"
import {DbUser} from "../user/user.model"
import ObjectId = Schema.Types.ObjectId

export interface DbDeck extends Document {
    id: string
    name: string
    language: string | DbLanguage
    nativeLanguage: string | DbLanguage
    cards: string[] | DbCard[]
    cardCount: number
    subscribers: string[] | DbUser[]
    subscriberCount: number
    ratings: Array<{
        upvote: boolean
        user: string | DbUser
    }>
    rating: number
    owner: string | DbUser
    tags: string[]
}

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    language: {
        type: ObjectId,
        ref: "Language",
        required: true
    },
    nativeLanguage: {
        type: ObjectId,
        ref: "Language",
        required: true
    },
    cards: [{
        type: ObjectId,
        ref: "Card",
        required: true
    }],
    cardCount: {
        type: Number,
        required: true,
        default: 0
    },
    subscribers: [{
        type: ObjectId,
        ref: "User",
        required: true
    }],
    subscriberCount: {
        type: Number,
        required: true,
        default: 0
    },
    ratings: [{
        upvote: Boolean,
        user: {
            type: ObjectId,
            ref: "User"
        }
    }],
    rating: {
        type: Number,
        default: 0
    },
    owner: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    tags: [String]
})

schema.pre("remove", function(this: DbDeck, next) {
    Card.remove({deck: this._id}).exec()
    next()
})

schema.index("owner")

export default model<DbDeck>("Deck", schema)

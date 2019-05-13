/* tslint:disable:only-arrow-functions */
import {model, Schema, Document} from "mongoose"
import {User} from "../../generated/graphql"
import Deck, {DbDeck} from "../deck/deck.model"
import {DbLanguage} from "../language/language.model"
import {DbPost} from "../post/post.model"
import ObjectId = Schema.Types.ObjectId

export interface DbUser extends Document {
    id: string
    introStep: number
    email: string
    username: string
    name: string
    gender: string
    locale: string
    picture: string
    isSocial: boolean
    nativeLanguage: string | DbLanguage
    languages: string[] | DbLanguage[]
    ownedDecks: string[] | DbDeck[]
    subscribedDecks: string[] | DbDeck[]
    feed: string[] | DbPost[]
    badges: string[]
    following: string[] | DbUser[]
}

const userSchema = new Schema({
    introStep: {
        type: Number,
        default: 0,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    locale: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    isSocial: Boolean,
    nativeLanguage: {
        type: ObjectId,
        ref: "Language"
    },
    languages: [{
        type: ObjectId,
        ref: "Language"
    }],
    ownedDecks: [{
        type: ObjectId,
        ref: "Deck"
    }],
    ownedDecksCount: {
        type: Number,
        required: true,
        default: 0
    },
    subscribedDecks: [{
        type: ObjectId,
        ref: "Deck"
    }],
    feed: [{
        type: ObjectId,
        ref: "Post"
    }],
    badges: [String],
    totalRating: {
        type: Number,
        default: 0,
        required: true
    },
    totalSubscribers: {
        type: Number,
        default: 0,
        required: true
    },
    following: [{
        type: ObjectId,
        ref: "User"
    }]
})

userSchema.pre("remove", function(this: DbUser, next) {
    Deck.remove({owner: this._id}).exec()
    next()
})

export const DBUser = model<DbUser>("User", userSchema)
export default DBUser

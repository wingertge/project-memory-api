/* tslint:disable:only-arrow-functions */
import {model, Schema, Document} from "mongoose"
import {User} from "../../generated/graphql"
import GraphConverter from "../GraphConverter"
import Deck, {DbDeck} from "../deck/deck.model"
import {DbLanguage} from "../language/language.model"
import ObjectId = Schema.Types.ObjectId

type Base = Document & GraphConverter

export interface DbUser extends Base {
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
}

const userSchema = new Schema({
    _id: String,
    introStep: Number,
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
    subscribedDecks: [{
        type: ObjectId,
        ref: "Deck"
    }]
})

userSchema.set("toObject", {virtuals: true})
userSchema.set("toJSON", {virtuals: true})

const deleteFun = function(this: DbUser, next) {
    Deck.remove({owner: this._id}).exec()
    next()
}

userSchema.pre("remove", deleteFun)
userSchema.pre("deleteMany", deleteFun)

userSchema.method("toGraph", function(this: any) {
    return JSON.parse(JSON.stringify(this))
})

export default model<DbUser>("User", userSchema)

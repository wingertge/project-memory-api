import {model, Schema, Document} from "mongoose"
import {Card} from "../../generated/graphql"
import Review from "../review/review.model"
import Deck, {DbDeck} from "../deck/deck.model"
import ObjectId = Schema.Types.ObjectId

export interface DbCard extends Document {
    id: string
    meaning: string
    pronunciation: string
    translation: string
    audioUrl: string
    deck: string | DbDeck
}

const schema = new Schema({
    meaning: String,
    pronunciation: String,
    translation: String,
    audioUrl: String,
    deck: {
        type: ObjectId,
        ref: "Deck"
    }
})

schema.set("toObject", {
    transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
    }
})
schema.set("toJSON", {
    transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
    }
})

const removeFun = function(this: DbCard, next) {
    console.log(this._id)
    Review.remove({card: this._id}).exec()
    next()
}

const saveFun = function(this: DbCard, next) {
    console.log(this)
    Deck.findByIdAndUpdate(this.deck, {$push: {cards: this._id}, $inc: {cardCount: 1}}).select("subscribers owner").then(dbDeck => {
        console.log(dbDeck)
        const reviews = (dbDeck!.subscribers! as string[]).map(sub => new Review({
            card: this._id,
            box: 0,
            user: sub
        }))
        reviews.push(new Review({
            card: this._id,
            box: 0,
            user: dbDeck!.owner
        }))
        Review.insertMany(reviews)
    })
    next()
}

schema.pre("remove", removeFun)

schema.pre("save", saveFun)
schema.pre("insertMany", saveFun)

schema.index("deck")

export default model<DbCard>("Card", schema)

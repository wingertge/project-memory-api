import {model, Schema, Document} from "mongoose"
import {Card} from "../../generated/graphql"
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

schema.index("deck")
schema.index({meaning: "text", pronunciation: "text", translation: "text"})

export const DBCard = model<DbCard>("Card", schema)
export default DBCard

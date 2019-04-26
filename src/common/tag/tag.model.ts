import {model, Schema, Document} from "mongoose"
import {DbDeck} from "../deck/deck.model"
import ObjectId = Schema.Types.ObjectId

export interface DbTag extends Document {
    id: string
    tagText: string
    decks: string[] | DbDeck[]
}

const schema = new Schema({
    tagText: {
        type: String,
        required: true
    },
    decks: [{
        type: ObjectId,
        ref: "Deck"
    }],
    decksLength: {
        type: Number,
        required: true,
        default: 0
    }
})

schema.index("tagText")
schema.index({name: "text", tagText: "text"})

export const DBTag = model<DbTag>("Tag", schema)
export default DBTag

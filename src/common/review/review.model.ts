import {Schema, Document, model} from "mongoose"
import {Review, ReviewFields} from "../../generated/graphql"
import {DbCard} from "../card/card.model"
import User, {DbUser} from "../user/user.model"
import ObjectId = Schema.Types.ObjectId

export interface DbReview extends Document {
    id: string
    nextReviewAt: Date
    box: number
    card: string | DbCard
    user: string | DbUser
    reviewedFields: ReviewFields[]
    correct: boolean
    archived: boolean
}

const schema = new Schema({
    nextReviewAt: Date,
    box: {
        type: Number,
        required: true,
        default: 0
    },
    card: {
        type: ObjectId,
        ref: "Card"
    },
    user: {
        type: ObjectId,
        ref: "User"
    },
    reviewedFields: [String],
    correct: {
        type: Boolean,
        default: true
    },
    deck: {
        type: ObjectId,
        ref: "Deck"
    },
    archived: {
        type: Boolean,
        required: true,
        default: false
    }
})

schema.index("user")

export const DBReview = model<DbReview>("Review", schema)

export default DBReview

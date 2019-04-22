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
    }
})

schema.set("toObject", {virtuals: true})
schema.set("toJSON", {virtuals: true})

const saveFun = function(this: DbReview, next) {
    User.findByIdAndUpdate(this.user, {$push: {reviewQueue: this._id}}).exec()
    next()
}

const removeFun = function(this: DbReview, next) {
    User.findByIdAndUpdate(this.user, {$pull: {reviewQueue: this._id}}).exec()
    next()
}

schema.pre<DbReview>("save", saveFun)
schema.pre<DbReview>("insertMany", saveFun)

schema.pre<DbReview>("remove", removeFun)
schema.pre<DbReview>("deleteMany", removeFun)

schema.index("user")

export default model<DbReview>("Review", schema)

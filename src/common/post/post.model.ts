import {Schema, Document, model} from "mongoose"
import {DbUser} from "../user/user.model"
import ObjectId = Schema.Types.ObjectId

export type PostType = "post" | "repost"

export interface DbPost extends Document {
    id: string
    type: PostType
    by: string | DbUser
    content?: string
    originalPost?: string | DbPost
}

const schema = new Schema({
    createdAt: Date,
    type: {
        type: String,
        required: true
    },
    by: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: false
    },
    originalPost: {
        type: ObjectId,
        ref: "Post",
        required: false
    }
})

schema.set("toObject", {virtuals: true})
schema.set("toJSON", {virtuals: true})

export default model<DbPost>("Post", schema)

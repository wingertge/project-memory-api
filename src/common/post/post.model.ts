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
    likeCount: number
    likes: string[] | DbUser[]
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
    },
    likeCount: {
        type: Number,
        required: true,
        default: 0
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }]
})

export const DBPost = model<DbPost>("Post", schema)
export default DBPost

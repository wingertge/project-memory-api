import {model, Schema, Document} from "mongoose"
import {DbUser} from "../user/user.model"
import {DbIssueReply} from "./issuereply.model"
import ObjectId = Schema.Types.ObjectId

export interface DbIssue extends Document {
    id: string
    title: string
    content: string
    replies: string[] | DbIssueReply[]
    repliesContent: string[]
    replyCount: number
    by: string | DbUser
    postedAt: Date
    lastActivity: Date
}

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    replies: [{
        type: ObjectId,
        ref: "IssueReply"
    }],
    repliesContent: [{
        replyId: ObjectId,
        content: String
    }],
    replyCount: {
        type: Number,
        required: true,
        default: 0
    },
    by: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    postedAt: {
        type: Date,
        required: true
    },
    lastActivity: {
        type: Date,
        required: true
    }
})

schema.index({title: "text", content: "text", "repliesContent.content": "text"})

export const DBIssue = model<DbIssue>("Issue", schema)
export default DBIssue

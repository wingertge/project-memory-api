import {model, Schema, Document} from "mongoose"
import {DbUser} from "../user/user.model"
import {DbIssue} from "./issue.model"
import ObjectId = Schema.Types.ObjectId

export interface DbIssueReply extends Document {
    id: string
    content: string
    by: string | DbUser
    postedAt: Date
    issue: string | DbIssue
}

const schema = new Schema({
    content: {
        type: String,
        required: true
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
    issue: {
        type: ObjectId,
        ref: "Issue",
        required: true
    }
})

export const DBIssueReply = model<DbIssueReply>("IssueReply", schema)
export default DBIssueReply

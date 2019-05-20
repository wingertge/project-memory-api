import {model, Schema, Document} from "mongoose"
import {DbUser} from "../user/user.model"
import {DbIssue} from "./issue.model"
import ObjectId = Schema.Types.ObjectId

export interface DbIssueReply extends Document {
    id: string
    content: string
    by: string | DbUser
    postedAt: Date
    issue: string | DbIssue,
    editedOn?: Date
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
    editedOn: Date,
    issue: {
        type: ObjectId,
        ref: "Issue",
        required: true
    },
    reports: [{
        by: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        message: String
    }],
    reportCount: {
        type: Number,
        required: true,
        default: 0
    },
    hidden: {
        type: Boolean,
        required: true,
        default: false
    }
})

export const DBIssueReply = model<DbIssueReply>("IssueReply", schema)
export default DBIssueReply

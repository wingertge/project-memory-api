import {IssueFilterInput, Resolvers} from "../../generated/graphql"
import AuthError, {ErrorType} from "../AuthError"
import {convertComparator} from "../comparators"
import project from "../project"
import {validateIssue} from "../validators"
import DBIssue from "./issue.model"
import DBIssueReply from "./issuereply.model"

const convertIssueFilter = ({by, title, textSearch, replyCount, postedAt, lastActivity}: IssueFilterInput) => {
    const find: any = {}
    if(by) find.by = by
    if(title) find.title = title
    if(textSearch) find.$text = {$search: textSearch}
    if(replyCount) find.replyCount = convertComparator(replyCount)
    if(postedAt) find.postedAt = convertComparator(postedAt)
    if(lastActivity) find.postedAt = convertComparator(lastActivity)
    return find
}

export const issueResolvers: Resolvers = {
    Query: {
        issue: async (_, {id}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            return await project(DBIssue, DBIssue.findById(id), info) as any
        },
        issues: async (_, {limit, offset, filter, sort}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            const {sortDirection = "desc", sortBy = "lastActivity"} = sort || {}

            let q = DBIssue.find(convertIssueFilter(filter || {})).sort({[sortBy as string]: sortDirection})
            if(limit) q = q.limit(limit)
            if(offset) q = q.skip(offset)
            return await project(DBIssue, q, info) as any
        },
        issuesCount: async (_, {filter}, {user}) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            return await DBIssue.countDocuments(convertIssueFilter(filter || {}))
        }
    },
    Issue: {
        replies: async ({id}, {limit, offset, filter = {}, sort = {}}, _, info) => {
            const {by, postedAt} = filter!
            const {sortBy = "postedAt", sortDirection = "asc"} = sort!
            const find: any = {issue: id}
            if(postedAt) find.postedAt = convertComparator(postedAt)
            if(by) find.by = by
            let query = DBIssueReply.find(find).sort({[sortBy as string]: sortDirection})
            if(limit) query = query.limit(limit)
            if(offset) query = query.skip(offset)
            return await project(DBIssueReply, query, info) as any
        },
        isReportedBy: async ({id}, {id: userId}) => {
            const result = await DBIssue.find({_id: id, "reports.by": userId}).select("_id")
            return result.length > 0
        }
    },
    IssueReply: {
        isReportedBy: async ({id}, {id: userId}) => {
            const result = await DBIssueReply.find({_id: id, "reports.by": userId}).select("_id")
            return result.length > 0
        }
    },
    Mutation: {
        createIssue: async (_, {input}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            validateIssue(input)
            const {title, content} = input
            const duplicates = await DBIssue.find({
                by: user.id,
                title,
                content,
                postedAt: {$gt: new Date(new Date().getTime() - 10000)}
            }).select("by")
            if(duplicates.length > 0) return null
            const issue = await new DBIssue({
                title,
                content,
                by: user.id,
                postedAt: new Date(),
                lastActivity: new Date()
            }).save()
            return await project(DBIssue, DBIssue.findById(issue.id), info) as any
        },
        editIssue: async (_, {id, input}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            validateIssue(input)
            const result = await project(DBIssue, DBIssue.findOneAndUpdate({_id: id, by: user.id}, {...input, editedOn: new Date()}, {new: true}), info)
            if(!result) throw new AuthError(ErrorType.Unauthorized)
            return result as any
        },
        deleteIssue: async (_, {id}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            const result = await project(DBIssue, DBIssue.findOneAndDelete({_id: id, by: user.id}), info)
            if(!result) throw new AuthError(ErrorType.Unauthorized)
            await DBIssueReply.deleteMany({issue: id})
            return result as any
        },
        replyToIssue: async (_, {id, content}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            const duplicates = await DBIssueReply.find({
                content,
                by: user.id,
                postedAt: {$gt: new Date(new Date().getTime() - 10000)},
                issue: id
            })
            if(duplicates.length > 0) return await project(DBIssue, DBIssue.findById(id), info)
            const reply = await new DBIssueReply({
                content,
                by: user.id,
                postedAt: new Date(),
                issue: id
            }).save()
            return await project(DBIssue, DBIssue.findByIdAndUpdate(id, {$push: {replies: reply.id, repliesContent: {replyId: reply.id, content}}, $set: {lastActivity: new Date()}, $inc: {replyCount: 1}}), info) as any
        },
        editIssueReply: async (_, {id, content}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            const reply = await DBIssueReply.findOne({_id: id, by: user.id}).select("issue")
            if(!reply) throw new AuthError(ErrorType.Unauthorized)
            await DBIssue.findOneAndUpdate({
                _id: reply.issue,
                "repliesContent.replyId": id
            }, {"repliesContent.$.content": content}).select("_id")
            return await project(DBIssueReply, DBIssueReply.findOneAndUpdate({_id: id, by: user.id}, {content, editedOn: new Date()}, {new: true}), info) as any
        },
        deleteIssueReply: async (_, {id}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            const reply = await DBIssueReply.findOneAndDelete({_id: id, by: user.id}).select("issue")
            if(!reply) throw new AuthError(ErrorType.Unauthorized)
            const result = await project(DBIssue, DBIssue.findByIdAndUpdate(reply.issue, {$pull: {replies: id, repliesContent: {replyId: id}}, $inc: {replyCount: -1}}), info)
            return result as any
        },
        reportIssue: async (_, {id, reason, message}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            const result = await project(DBIssue, DBIssue.findOneAndUpdate({
                _id: id,
                "reports.by": {$ne: user.id}
            }, {$push: {reports: {by: user.id, reason, message}}, $inc: {reportCount: 1}}, {new: true}), info)
            if(!result) throw new Error("Already reported that issue")
            return result as any
        },
        reportIssueReply: async (_, {id, reason, message}, {user}, info) => {
            const result = await project(DBIssueReply, DBIssueReply.findOneAndUpdate({
                _id: id,
                "reports.by": {$ne: user.id}
            }, {$push: {reports: {by: user.id, reason, message}}, $inc: {reportCount: 1}}, {new: true}), info)
            if(!result) throw new Error("Already reported that issue reply")
            return result as any
        }
    }
}

export default issueResolvers

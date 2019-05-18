import Maybe from "graphql/tsutils/Maybe"
import {PostFilterInput, Resolvers} from "../../generated/graphql"
import AuthError, {ErrorType} from "../AuthError"
import makeLogger from "../logging"
import project from "../project"
import DBUser from "../user/user.model"
import {validatePost, validateReport} from "../validators"
import DBPost from "./post.model"

const filteredQuery = (userId: string, filter: Maybe<PostFilterInput>, currentUserId: string) => {
    filter = filter || {}
    const find: any = {by: userId, "reports.by": {$ne: currentUserId}}
    if(filter.type) find.type = filter.type
    let q = DBPost.find(find).sort({[filter.sortBy || "createdAt"]: filter.sortDirection || "desc"})
    if(filter.limit) q = q.limit(filter.limit)
    if(filter.offset) q = q.skip(filter.offset)
    return q

}

const logger = makeLogger("post.resolvers")

export const postResolvers: Resolvers = {
    User: {
        feed: async ({id}, {filter}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            return await project(DBPost, filteredQuery(id, filter, user.id), info) as any
        },
        subscriptionFeed: async ({id}, {filter}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            if(user.id !== id) throw new AuthError(ErrorType.Unauthorized)

            filter = filter || {}

            const dbUser = await DBUser.findById(id).select("following")
            const following = dbUser!.following as string[]

            const find: any = {by: {$in: following}}
            if(filter.type) find.type = filter.type
            let q = DBPost.find(find).sort({[filter.sortBy || "createdAt"]: filter.sortDirection || "desc"})
            if(filter.limit) q = q.limit(filter.limit)
            if(filter.offset) q = q.skip(filter.offset)

            return await project(DBPost, q, info) as any
        }
    },
    Mutation: {
        createPost: async (_, {input, filter}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            validatePost(input)
            if(!input.originalPost && (!input.content || input.content.trim().length === 0)) throw new Error("Message can't be empty")
            await new DBPost({
                createdAt: new Date(),
                type: input.type,
                by: user.id,
                content: input.content,
                originalPost: input.originalPost
            }).save()
            return await project(DBPost, filteredQuery(user.id, filter, user.id), info) as any
        },
        editPost: async (_, {id, input}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            validatePost(input)
            if(!input.originalPost && (!input.content || input.content.trim().length === 0)) throw new Error("Message can't be empty")
            return await project(DBPost, DBPost.updateOne({_id: id, by: user.id}, {...input}, {new: true}), info) as any
        },
        deletePost: async (_, {id, filter}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            const post = await DBPost.findOne({_id: id, by: user.id}).select("by")
            if(!post) throw new AuthError(ErrorType.Unauthorized)
            await DBPost.findByIdAndDelete(id)
            await DBPost.deleteMany({originalPost: id})
            return await project(DBPost, filteredQuery(user.id, filter, user.id), info) as any
        },
        changePostLikeStatus: async (_, {id, userID, value}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            if(user.id !== userID) throw new AuthError(ErrorType.Unauthorized)
            logger.debug(value)
            if(value) {
                const result = await DBPost.updateOne({_id: id, likes: {$ne: userID}}, {$inc: {likeCount: 1}, $push: {likes: userID}})
                logger.debug(result)
            } else
                await DBPost.updateOne({_id: id, likes: userID}, {$inc: {likeCount: -1}, $pull: {likes: userID}})
            return await project(DBPost, DBPost.findById(id), info) as any
        },
        addReportToPost: async (_, {id, reportedBy, reason, message}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            if(user.id !== reportedBy) throw new AuthError(ErrorType.Unauthorized)
            validateReport(message || "")
            const post = await DBPost.findOneAndUpdate({_id: id, "reports.by": {$ne: reportedBy}}, {$push: {reports: {by: reportedBy, reason, message}}}).select("_id")
            if(!post) throw new Error("Already reported that post")
            return await project(DBPost, DBPost.findById(id), info) as any
        }
    },
    Post: {
        isLikedBy: async ({id}, {userID}) => {
            const posts = await DBPost.find({_id: id, likes: userID}).select("likeCount")
            return posts.length > 0
        },
        isReportedBy: async ({id}, {userID}) => {
            const report = await DBPost.find({_id: id, "reports.by": userID}).select("_id")
            return report.length > 0
        }
    }
}

export default postResolvers

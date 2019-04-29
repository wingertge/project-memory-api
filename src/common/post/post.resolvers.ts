import Maybe from "graphql/tsutils/Maybe"
import {PostFilterInput, Resolvers} from "../../generated/graphql"
import AuthError, {ErrorType} from "../AuthError"
import project from "../project"
import {validatePost} from "../validators"
import DBPost from "./post.model"

const filteredQuery = (userId: string, filter: Maybe<PostFilterInput>) => {
    filter = filter || {}
    const find: any = {by: userId}
    if(filter.type) find.type = filter.type
    let q = DBPost.find(find).sort({[filter.sortBy || "createdAt"]: filter.sortDirection || "desc"})
    if(filter.limit) q = q.limit(filter.limit)
    if(filter.offset) q = q.skip(filter.offset)
    return q

}
export const postResolvers: Resolvers = {
    User: {
        feed: async ({id}, {filter}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            return await project(DBPost, filteredQuery(id, filter), info) as any
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
            return await project(DBPost, filteredQuery(user.id, filter), info) as any
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
            return await project(DBPost, filteredQuery(user.id, filter), info) as any
        }
    }
}

export default postResolvers

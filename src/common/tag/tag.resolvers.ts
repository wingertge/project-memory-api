import {Resolvers} from "../../generated/graphql"
import AuthError, {ErrorType} from "../AuthError"
import DBDeck from "../deck/deck.model"
import project from "../project"
import DBTag from "./tag.model"

//const logger = makeLogger("resolvers.tag")

const tagResolvers: Resolvers = {
    Mutation: {
        addTagToDeck: async (_, {id, tag}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            const deck = await DBDeck.findOne({_id: id}).select("owner")
            if(!deck) throw new Error("Not Found")
            if(deck.owner.toString() !== user.id) throw new AuthError(ErrorType.Unauthorized)
            await DBTag.updateOne({tagText: tag}, {tagText: tag}, {upsert: true})
            await DBTag.updateOne({tagText: tag, decks: {$ne: id}}, {$push: {decks: id}, $inc: {decksLength: 1}})
            await DBDeck.updateOne({_id: id, owner: user.id, tags: {$ne: tag}}, {$push: {tags: tag}})
            return await project(DBDeck, DBDeck.findById(id), info) as any
        },
        removeTagFromDeck: async (_, {id, tag}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            const dbTag = await DBTag.findOneAndUpdate({tagText: tag, decks: id}, {$pull: {decks: id}, $inc: {decksLength: -1}}, {new: true}).select("decks id").slice("decks", 1)
            if(!dbTag) throw new Error("Tag doesn't exist")
            if(dbTag.decks.length === 0) {
                await DBTag.deleteOne({_id: dbTag.id})
            }
            return await project(DBDeck, DBDeck.findOneAndUpdate({
                _id: id,
                owner: user.id
            }, {$pull: {tags: tag}}, {new: true}), info).orFail(new AuthError(ErrorType.Unauthorized)) as any
        }
    },
    Query: {
        tags: async (_, {search, limit, offset}, {user}) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            let q = DBTag.find({$text: {$search: search}}).select("tagText").skip(offset || 0)
            if(limit) q = q.limit(limit)
            const tags = await q
            return tags.sort((tag1, tag2) => tag2.decks.length - tag1.decks.length).map(tag => tag.tagText)
        }
    }
}

export default tagResolvers

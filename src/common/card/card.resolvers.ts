import debug from "debug"
import {Resolvers} from "../../generated/graphql"
import AuthError, {ErrorType} from "../AuthError"
import DBDeck from "../deck/deck.model"
import project from "../project"
import DBCard from "./card.model"
import DBUser from "../user/user.model"
import DBReview from "../review/review.model"
import uuid = require("uuid")

const log = debug("api:resolvers:card")
log.log = console.log.bind(console)

const assertPermission = async (deckId, user) => {
    if(!user)
        throw new AuthError(ErrorType.Unauthenticated)
    const deck = await DBDeck.findById(deckId).select("owner")
    if(!deck)
        throw new Error("Deck with that ID doesn't exist")
    const ownerId = deck.owner as string
    if(user.id !== ownerId)
        throw new AuthError(ErrorType.Unauthorized)
}

const resolvers: Resolvers = {
    Mutation: {
        createCard: async (_, {input}, {user}, info) => {
            await assertPermission(input.deck, user)
            await new DBCard({
                _id: uuid(),
                ...input
            }).save()
            return await project(DBDeck, DBDeck.findById(input.deck), info) as any
        },
        editCard: async (_, {id, input}, {user}, info) => {
            log(id)
            if(!input.deck) {
                const currentCard = await DBCard.findById(id).select("deck")
                log(currentCard)
                await assertPermission(currentCard!.deck, user)
            } else await assertPermission(input.deck, user)
            return await project(DBCard, DBCard.findByIdAndUpdate(id, input, {new: true}), info) as any
        },
        deleteCards: async (_, {deck, ids}, {user}, info) => {
            await assertPermission(deck, user)
            await DBCard.deleteMany({_id: {$in: ids}})
            const reviewsToDelete = await DBReview.find({card: {$in: ids}}).select("_id user")
            const users = reviewsToDelete.map(review => review.user)
            const deletedIds = reviewsToDelete.map(review => review.id)
            await DBUser.updateMany({_id: {$in: users}}, {$pull: {reviewQueue: deletedIds}})
            await DBReview.deleteMany({card: {$in: ids}})
            return await project(DBDeck, DBDeck.findByIdAndUpdate(deck, {$pullAll: {cards: ids}, $inc: {cardCount: -ids.length}}, {new: true}), info) as any
        }
    },
    Deck: {
        cards: async ({id}, {filter}, _, info) => {
            let query = DBCard.find({deck: id})
            query = project(DBCard, query, info)!
            if(!filter) {
                return await query.sort({meaning: 1})
            } else {
                if(filter.limit) query = query.limit(filter.limit)
                if(filter.offset) query = query.skip(filter.offset)
                const cards = await query.sort({[filter.sortBy || "meaning"]: (filter.sortDirection || "asc") === "asc" ? 1 : -1})
                log(cards)
                return cards as any
            }
        }
    }
}

export default resolvers

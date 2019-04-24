import debug from "debug"
import {Resolvers} from "../../generated/graphql"
import AuthError, {ErrorType} from "../AuthError"
import DBDeck from "../deck/deck.model"
import graphify from "../graphify"
import project from "../project"
import DBCard from "./card.model"
import DBUser from "../user/user.model"
import DBReview from "../review/review.model"

const log = debug("api:topicResolvers:card")
log.log = console.log.bind(console)

const assertPermission = async (deckId, user) => {
    if(!user)
        throw new AuthError(ErrorType.Unauthenticated)
    const deck = await DBDeck.findById(deckId).select("owner")
    if(!deck)
        throw new Error("Deck with that ID doesn't exist")
    const ownerId = deck.owner as string
    if(user.id.toString() !== ownerId.toString())
        throw new AuthError(ErrorType.Unauthorized)
}

const resolvers: Resolvers = {
    Mutation: {
        createCard: async (_, {input}, {user}, info) => {
            await assertPermission(input.deck, user)
            await new DBCard({...input}).save()
            return graphify(await project(DBDeck, DBDeck.findById(input.deck), info) as any)
        },
        editCard: async (_, {id, input}, {user}, info) => {
            log(id)
            if(!input.deck) {
                const currentCard = await DBCard.findById(id).select("deck")
                log(currentCard)
                await assertPermission(currentCard!.deck, user)
            } else await assertPermission(input.deck, user)
            return graphify(await project(DBCard, DBCard.findByIdAndUpdate(id, input, {new: true}), info) as any)
        },
        deleteCards: async (_, {deck, ids}, {user}, info) => {
            await assertPermission(deck, user)
            await DBCard.deleteMany({_id: {$in: ids}})
            const reviewsToDelete = await DBReview.find({card: {$in: ids}}).select("_id user")
            const users = reviewsToDelete.map(review => review.user)
            const deletedIds = reviewsToDelete.map(review => review.id)
            await DBUser.updateMany({_id: {$in: users}}, {$pull: {reviewQueue: deletedIds}})
            await DBReview.deleteMany({card: {$in: ids}})
            return graphify(await project(DBDeck, DBDeck.findByIdAndUpdate(deck, {$pullAll: {cards: ids}, $inc: {cardCount: -ids.length}}, {new: true}), info) as any)
        }
    },
    Deck: {
        cards: async ({id}, {filter}, _, info) => {
            let query = DBCard.find({deck: id})
            query = project(DBCard, query, info)!
            if(!filter) {
                return graphify(await query.sort({meaning: 1}))
            } else {
                if(filter.limit) query = query.limit(filter.limit)
                if(filter.offset) query = query.skip(filter.offset)
                const cards = await query.sort({[filter.sortBy || "meaning"]: (filter.sortDirection || "asc") === "asc" ? 1 : -1}) as any
                log(cards)
                return graphify(cards)
            }
        }
    }
}

export default resolvers

import debug from "debug"
import {Resolvers} from "../../generated/graphql"
import AuthError, {ErrorType} from "../AuthError"
import DBDeck from "../deck/deck.model"
import project from "../project"
import {escapeRegExp, validateCard} from "../validators"
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
            validateCard(input)
            const card = await new DBCard({...input}).save()
            await DBDeck.findByIdAndUpdate(card.deck, {$push: {cards: card._id}, $inc: {cardCount: 1}}).select("_id subscribers owner").then(dbDeck => {
                console.log(dbDeck)
                const reviews = (dbDeck!.subscribers! as string[]).map(sub => new DBReview({
                    card: card._id,
                    box: 0,
                    user: sub,
                    deck: dbDeck!.id
                }))
                reviews.push(new DBReview({
                    card: card._id,
                    box: 0,
                    user: dbDeck!.owner,
                    deck: dbDeck!.id
                }))
                DBReview.insertMany(reviews)
            })
            return await project(DBDeck, DBDeck.findById(input.deck), info) as any
        },
        editCard: async (_, {id, input}, {user}, info) => {
            log(id)
            validateCard(input)
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
            return await project(DBDeck, DBDeck.findByIdAndUpdate(deck, {
                $inc: {cardCount: -ids.length}
            }, {new: true}), info) as any
        }
    },
    Deck: {
        cards: async ({id}, {limit, offset, filter = {}, sort = {}}, _, info) => {
            const {search} = filter!
            const {sortBy = "meaning", sortDirection = "asc"} = sort!
            const condition: any = {deck: id}
            if(search) {
                const escapedSearch = escapeRegExp(search)
                condition.$or = [
                    //{$text: {$search: filter.search}},
                    {meaning: new RegExp(escapedSearch, "i")},
                    {pronunciation: new RegExp(escapedSearch, "i")},
                    {translation: new RegExp(escapedSearch, "i")}
                ]
            }
            let query = DBCard.find(condition).sort({[sortBy as string]: sortDirection})
            query = project(DBCard, query, info)!
            if(limit) query = query.limit(limit)
            if(offset) query = query.skip(offset)
            return await project(DBCard, query, info) as any
        }
    }
}

export default resolvers

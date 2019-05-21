import {Types} from "mongoose"
import {oc} from "ts-optchain"
import {Resolvers} from "../../generated/graphql"
import AuthError, {ErrorType} from "../AuthError"
import DBCard from "../card/card.model"
import {convertEqualityComparator} from "../comparators"
import DBLanguage from "../language/language.model"
import {getTextLang} from "../language/textLanguage"
//import makeLogger from "../logging"
import project from "../project"
import DBReview from "../review/review.model"
import DBUser from "../user/user.model"
import {validateDeck} from "../validators"
import DBDeck from "./deck.model"
import ObjectId = Types.ObjectId

//const logger = makeLogger("resolvers.deck")

const resolvers: Resolvers = {
    Query: {
        deck: async (_, {id}, {user}, info) => {
            if(!user)
                throw new AuthError(ErrorType.Unauthenticated)
            return await project(DBDeck, DBDeck.findById(id), info) as any
        },
        decks: async (_, {limit, offset = 0, filter = {}, sort = {}}, {user}, info) => {
            if(!user)
                throw new AuthError(ErrorType.Unauthenticated)
            const {id, nativeLanguage, tags, search, language, owner, subscribers} = filter!
            const {sortBy = "name", sortDirection = "asc"} = sort!
            const conditions: any = {$or: [{hidden: false}, {owner: user.id}]}

            if(language) conditions.language = convertEqualityComparator(language)
            if(nativeLanguage) conditions.nativeLanguage = convertEqualityComparator(nativeLanguage)
            if(search) conditions.$text = {$search: search}
            if(owner) conditions.owner = convertEqualityComparator(owner)
            if(tags) conditions.tags = convertEqualityComparator(tags)
            if(owner) conditions.owner = convertEqualityComparator(owner)
            if(subscribers) conditions.subscribers = convertEqualityComparator(subscribers)
            if(id) conditions._id = convertEqualityComparator(id)

            let decksQuery = DBDeck.find(conditions).sort({[sortBy as string]: sortDirection}).skip(offset!)
            if(limit) decksQuery = decksQuery.limit(limit)

            return await project(DBDeck, decksQuery, info) as any
        }
    },
    Mutation: {
        changeSubscriptionStatus: async (_, {id, deckID, value}, {user}, info) => {
            if(!user || user.id !== id)
                throw new AuthError(ErrorType.Unauthorized)
            const userUpdate = value ? {$push: {subscribedDecks: deckID}} : {$pull: {subscribedDecks: deckID}}
            const deckUpdate = value ? {$push: {subscribers: id}, $inc: {subscriberCount: 1}} : {$pull: {subscribers: id}, $inc: {subscriberCount: -1}}
            const deck = await DBDeck.findByIdAndUpdate(deckID, deckUpdate).select("owner")
            await DBUser.findByIdAndUpdate(deck!.owner, {$inc: {totalSubscribers: value ? 1 : -1}})
            if(value) {
                await DBReview.updateMany(
                    {user: id, deck: deckID},
                    {archived: false}
                )
                const existing = await DBReview.find({user: id, deck: deckID}).select("card")
                const cards = await DBCard.find({deck: deckID}).select("_id")
                const reviews = cards
                    .map(card => card.id as string)
                    .filter(cardId => !existing.some(existing => existing.card.toString() === cardId.toString()))
                    .map(cardId => new DBReview({
                        box: 0,
                        card: cardId,
                        user: id,
                        deck: deckID
                    }))
                await DBReview.insertMany(reviews)
            } else {
                await DBReview.updateMany({user: id, deck: deckID}, {archived: true})
            }

            return await project(DBUser, DBUser.findByIdAndUpdate(id, userUpdate, {new: true}), info) as any
        },
        changeLikeStatus: async (_, {id, userID, value}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            if(user.id !== userID) throw new AuthError(ErrorType.Unauthorized)
            if(value) {
                await DBDeck.updateOne({_id: id, likes: {$ne: userID}}, {$push: {likes: userID}, $inc: {rating: 1}})
            } else {
                await DBDeck.updateOne({_id: id, likes: userID}, {$pull: {likes: userID}, $inc: {rating: -1}})
            }
            return await project(DBDeck, DBDeck.findById(id), info) as any
        },
        addDeck: async (_, {input}, {user}, info) => {
            const userId = oc(input).owner()
            if(!user || user.id !== userId) throw new AuthError(ErrorType.Unauthenticated)
            validateDeck(input)
            const owner = await DBUser.findOne({_id: userId, $or: [{ownedDecksCount: {$lte: 50}}, {ownedDecksCount: {$exists: false}}]}).select("_id")
            if(!owner) throw new Error("Too many decks")
            const nativeLang = await DBLanguage.findById(input.nativeLanguage).select("languageCode")
            let cardCount = 0
            const deckId = ObjectId()
            if(input.cards && input.cards.length > 0) {
                const newCards = input.cards.map(card => new DBCard({
                    _id: ObjectId(),
                    deck: deckId,
                    ...card
                }))
                const cardIds = newCards.map(card => card._id)
                cardCount = cardIds.length
                await DBCard.insertMany(newCards)
                const reviews = cardIds.map(id => new DBReview({
                    card: id,
                    box: 0,
                    user: owner.id,
                    deck: deckId
                }))
                DBReview.insertMany(reviews)
            }
            const deck = await new DBDeck({...input, nameLanguage: getTextLang(nativeLang!), _id: deckId, cardCount, hidden: false}).save()
            const result = await DBUser.updateOne({_id: userId, $or: [{ownedDecksCount: {$lte: 50}}, {ownedDecksCount: {$exists: false}}]}, {$push: {ownedDecks: deck._id}, $inc: {ownedDecksCount: 1}})
            if(result.nModified === 0) throw new Error("You can't create more than 50 decks")
            return await project(DBUser, DBUser.findById(userId), info) as any
        },
        async updateDeck(_, {id, input}, {user}, info) {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            validateDeck(input)
            return await project(DBDeck, DBDeck.findOneAndUpdate({
                _id: id,
                owner: user.id
            }, {name: input.name}, {new: true}), info).orFail(new AuthError(ErrorType.Unauthorized)) as any
        },
        deleteDeck: async (_, {id}, {user}, info) => {
            if(!user) throw new AuthError(ErrorType.Unauthenticated)
            const deck = await DBDeck.findOne({_id: id, owner: user.id}).select("owner")
            if(!deck) throw new AuthError(ErrorType.Unauthorized)
            await DBDeck.remove({_id: id, owner: user.id})
            await DBCard.remove({deck: id}).exec()
            await DBReview.remove({deck: id}).exec()
            return await project(DBUser, DBUser.findByIdAndUpdate(deck.owner, {$pull: {ownedDecks: id}, $inc: {ownedDecksCount: -1}}, {new: true}), info) as any
        }
    },
    Deck: {
        isLikedBy: async ({id}, {userID}) => {
            const count = await DBDeck.countDocuments({_id: id, likes: userID})
            return count > 0
        }
    }
}

export default resolvers

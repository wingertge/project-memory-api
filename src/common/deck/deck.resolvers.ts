import {oc} from "ts-optchain"
import {Resolvers} from "../../generated/graphql"
import AuthError, {ErrorType} from "../AuthError"
import DBLanguage from "../language/language.model"
import {getTextLang} from "../language/textLanguage"
import makeLogger from "../logging"
import project from "../project"
import DBUser from "../user/user.model"
import {validateDeck} from "../validators"
import DBDeck from "./deck.model"

const logger = makeLogger("resolvers.deck")

const resolvers: Resolvers = {
    Query: {
        deck: async (_, {id}, {user}, info) => {
            if(!user)
                throw new AuthError(ErrorType.Unauthenticated)
            return await project(DBDeck, DBDeck.findById(id), info) as any
        },
        decks: async (_, {filter}, {user}, info) => {
            if(!user)
                throw new AuthError(ErrorType.Unauthenticated)
            filter = filter || {}
            const conditions: any = {}

            if(filter.languages) conditions.language = {$in: filter.languages}
            if(filter.nativeLanguage) conditions.nativeLanguage = filter.nativeLanguage
            if(filter.search) conditions.$text = {$search: filter.search}
            if(filter.owner) conditions.owner = filter.owner
            if(filter.tags) conditions.tags = {$all: filter.tags}
            if(filter.excludeOwnedBy) conditions.owner = {$nin: filter.excludeOwnedBy}
            if(filter.excludeSubscribedBy) conditions.subscribers = {$nin: filter.excludeSubscribedBy}

            let decksQuery = DBDeck.find(conditions).sort({[filter.sortBy || "name"]: filter.sortDirection || "asc"}).skip(filter.offset || 0)
            if(filter.limit) decksQuery = decksQuery.limit(filter.limit)

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
            return await project(DBUser, DBUser.findByIdAndUpdate(id, userUpdate, {new: true}), info) as any
        },
        changeLikeStatus: async (_, {id, userID, value}, {user}, info) => {
            if(!user || user.id !== userID) throw new AuthError(ErrorType.Unauthorized)
            const deck = await DBDeck.findById(id).select("owner")
            const currentDeck = await DBDeck.findOne({_id: id, "ratings.user": userID}).select("ratings.$")
            logger.debug(currentDeck)
            let change
            if(currentDeck) {
                if(typeof value === "undefined")
                    change = currentDeck.ratings[0].upvote ? -1 : 1
                else if(value)
                    change = currentDeck.ratings[0].upvote ? 0 : 2
                else
                    change = currentDeck.ratings[0].upvote ? -2 : 0
            } else {
                change = typeof value !== "undefined" ? value ? 1 : -1 : 0
            }
            logger.debug(change)
            if(typeof value === "undefined" || value === null) {
                let dbDeck: any = await project(DBDeck, DBDeck.updateOne({_id: id, "ratings.user": userID}, {$pull: {ratings: {user: userID}}}, {new: true}), info)
                if(currentDeck) {
                    dbDeck = await project(DBDeck, DBDeck.findByIdAndUpdate(id, {$inc: {rating: change}}, {new: true}), info)
                    await DBUser.findByIdAndUpdate(deck!.owner, {$inc: {totalRating: change}})
                }
                logger.debug(dbDeck)
                return dbDeck
            } else {
                let dbDeck = await project(DBDeck, DBDeck.updateOne({_id: id, "ratings.user": {$ne: userID}}, {
                    $push: {
                        ratings: {
                            user: userID,
                            upvote: value
                        }
                    }
                }), info)
                if(dbDeck.matchedCount === 0) {
                    await project(DBDeck, DBDeck.updateOne({_id: id, "ratings.user": userID}, {$set: {"ratings.$.upvote": value}}), info)
                }

                dbDeck = await project(DBDeck, DBDeck.findByIdAndUpdate(id, {$inc: {rating: change}}, {new: true}), info)
                await DBUser.findByIdAndUpdate(deck!.owner, {$inc: {totalRating: change}})

                logger.debug(dbDeck)
                return dbDeck
            }
        },
        addDeck: async (_, {input}, {user}, info) => {
            const userId = oc(input).owner()
            if(!user || user.id !== userId) throw new AuthError(ErrorType.Unauthenticated)
            validateDeck(input)
            const owner = DBUser.findOne({_id: userId, ownedDecksCount: {$lte: 50}})
            if(!owner) throw new Error("Too many decks")
            const nativeLang = await DBLanguage.findById(input.nativeLanguage).select("languageCode")
            const deck = await new DBDeck({...input, nameLanguage: getTextLang(nativeLang!)}).save()
            const result = await DBUser.updateOne({_id: userId, ownedDecksCount: {$lte: 50}}, {$push: {ownedDecks: deck._id}, $inc: {ownedDecksCount: 1}})
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
            const deck = await DBDeck.findOneAndDelete({_id: id, owner: user.id}).select("owner")
            if(!deck) throw new AuthError(ErrorType.Unauthorized)
            return await project(DBUser, DBUser.findByIdAndUpdate(deck.owner, {$pull: {ownedDecks: id}, $inc: {ownedDecksCount: -1}}, {new: true}), info) as any
        }
    },
    Deck: {
        isLikedBy: async ({id}, {userID}) => {
            const user = await DBDeck.find({_id: id, ratings: {$elemMatch: {user: userID}}})
            return user.length > 0
        }
    }
}

export default resolvers

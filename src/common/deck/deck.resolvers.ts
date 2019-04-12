import debug from "debug"
import {oc} from "ts-optchain"
import {Deck, Resolvers} from "../../generated/graphql"
import AuthError, {ErrorType} from "../AuthError"
import project from "../project"
import DBUser from "../user/user.model"
import DBDeck from "./deck.model"

const log = debug("api:resolvers:deck")
log.log = console.log.bind(console)

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
            const conditions: any = {}
            if(oc(filter).languages())
                conditions.language = {$in: filter!.languages}
            if(oc(filter).search()) {
                conditions.$or = [
                    {meaning: {$regex: filter!.search, $options: "i"}},
                    {pronunciation: {$regex: filter!.search, $options: "i"}},
                    {translation: {$regex: filter!.search, $options: "i"}}
                ]
            }
            if(oc(filter).cardContained()) {
                conditions["cards.id"] = {$in: filter!.cardContained}
            }
            if(oc(filter).owner()) {
                conditions.owner = filter!.owner
            }
            const decksQuery = DBDeck.find(conditions)
                .limit(oc(filter).limit(Number.MAX_SAFE_INTEGER))
                .sort({[oc(filter).sortBy("name") as string]: oc(filter).sortDirection("asc")})

            return await project(DBDeck, decksQuery, info).exec() as any
        }
    },
    Mutation: {
        changeSubscriptionStatus: async (_, {id, deckID, value}, {user}, info) => {
            if(!user || user.id !== id)
                throw new AuthError(ErrorType.Unauthorized)
            const userUpdate = value ? {$push: {subscribedDecks: deckID}} : {$pull: {subscribedDecks: deckID}}
            const deckUpdate = value ? {$push: {subscribers: id}, $inc: {subscriberCount: 1}} : {$pull: {subscribers: id}, $inc: {subscriberCount: -1}}
            await DBDeck.findByIdAndUpdate(deckID, deckUpdate).exec()
            const dbUser = await project(DBUser, DBUser.findByIdAndUpdate(id, userUpdate, {new: true}), info).exec()
            return dbUser as any
        },
        changeLikeStatus: async (_, {id, userID, value}, {user}, info) => {
            if(!user || user.id !== userID)
                throw new AuthError(ErrorType.Unauthorized)
            log(id)
            const currentDeck = await DBDeck.findOne({_id: id, "ratings.user": userID}).select("ratings.$")
            log(currentDeck)
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
            log(change)
            if(typeof value === "undefined" || value === null) {
                let dbDeck = await project(DBDeck, DBDeck.updateOne({_id: id, "ratings.user": userID}, {$pull: {ratings: {user: userID}}}, {new: true}), info)
                if(currentDeck) {
                    dbDeck = await project(DBDeck, DBDeck.findByIdAndUpdate(id, {$inc: {rating: change}}, {new: true}), info)
                }
                log(dbDeck)
                return dbDeck as Deck
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

                log(dbDeck)
                return dbDeck as Deck
            }
        },
        addDeck: async (_, {input}, {user}, info) => {
            const userId = oc(input).owner()
            if(!user || user.id !== userId)
                throw new AuthError(ErrorType.Unauthenticated)
            const deck = await new DBDeck({...input}).save()
            const dbUser = await project(DBUser, DBUser.findByIdAndUpdate(userId, {$push: {ownedDecks: deck._id}}, {new: true}), info).exec()
            log(dbUser)
            return dbUser as any
        }
    },
    Deck: {
        isLikedBy: async (_, {userID}) => {
            const user = await DBDeck.find({ratings: {$elemMatch: {user: userID}}})
            return user.length > 0
        }
    }
}

export default resolvers

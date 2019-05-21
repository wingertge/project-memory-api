import {Resolvers} from "../../generated/graphql"
import AuthError, {ErrorType} from "../AuthError"
import {DbCard} from "../card/card.model"
import {convertComparator, convertEqualityComparator} from "../comparators"
import makeLogger from "../logging"
import project from "../project"
import {scheduleNextReview} from "../reviewScheduling"
import DBReview from "./review.model"
import debug from "debug"

const log = debug("api:resolvers:review")
log.log = console.log.bind(console)
const logger = makeLogger("review.resolvers")

const resolvers: Resolvers = {
    Query: {
        review: async (_, {id}, {user}, info) => {
            if(!user)
                throw new AuthError(ErrorType.Unauthenticated)

            const review = await project(DBReview, DBReview.findById(id).select("user"), info)
            const userId = review && (typeof review.user === "object" ? review.user.id : review.user)
            if(user.id !== userId)
                throw new AuthError(ErrorType.Unauthorized)

            return review as any
        }
    },
    User: {
        reviewQueue: async ({id}, {limit, offset, filter = {}, sort = {}}, _, info) => {
            const conditions: any = {user: id, $or: [{archived: false}, {archived: {$exists: false}}]}
            const {box, deck, nextReviewAt} = filter!
            const {sortBy = "nextReviewAt", sortDirection = "asc"} = sort!
            if(deck) conditions.deck = convertEqualityComparator(deck)
            if(nextReviewAt) conditions.nextReviewAt = convertComparator(nextReviewAt)
            if(box) conditions.box = convertComparator(box)

            let query = DBReview.find(conditions).sort({[sortBy as string]: sortDirection})
            if(limit) query = query.limit(limit)
            if(offset) query = query.skip(offset)
            const result = await project(DBReview, query, info)
            logger.debug(result)
            return result as any
        },
        reviewsCount: async ({id}, {filter}) => {
            const {box, deck, nextReviewAt} = filter!
            const conditions: any = {user: id, $or: [{archived: false}, {archived: {$exists: false}}]}
            if(deck) conditions.deck = convertEqualityComparator(deck)
            if(nextReviewAt) conditions.nextReviewAt = convertComparator(nextReviewAt)
            if(box) conditions.box = convertComparator(box)
            if(conditions.nextReviewAt) {
                logger.debug(conditions)
                logger.debug(conditions.nextReviewAt.$lte instanceof Date)
            }
            logger.debug(conditions)

            return await DBReview.countDocuments(conditions)
        }
    },
    Mutation: {
        submitReview: async (_, {id, field, correct}, {user}, info) => {
            if(!user)
                throw new AuthError(ErrorType.Unauthenticated)

            const reviewsCount = await DBReview.countDocuments({user: user.id, nextReviewAt: {$lte: new Date()}})
            const addedDelay = Math.floor(Math.random() * reviewsCount)
            const newDate = new Date(new Date().getTime() + addedDelay * 1000)
            const update: any = {$addToSet: {reviewedFields: field}, nextReviewAt: newDate}
            if(!correct) update.correct = false

            const review = await DBReview.findByIdAndUpdate(id, update, {new: true})
                .select("reviewedFields card user box correct").populate("card", "pronunciation")
            if(!review)
                throw new Error("Couldn't find a review with that ID")

            log(user.id)
            log(review.user)
            if(review.user.toString() !== user.id.toString()) {
                throw new AuthError(ErrorType.Unauthorized)
            }

            const card = review.card as DbCard
            const hasPronunciation = card.pronunciation && card.pronunciation !== ""
            const reviewedFields = review.reviewedFields
            logger.debug(reviewedFields)
            if(reviewedFields.length === 3 || (reviewedFields.length === 2 && !hasPronunciation)) {
                const nextReviewAt = scheduleNextReview(review.correct ? review.box + 1 : review.box - 1)
                logger.debug(nextReviewAt.toISOString())
                return await project(DBReview, DBReview.findByIdAndUpdate(id, {$set: {reviewedFields: [], nextReviewAt, correct: true}, $inc: {box: review.correct ? 1 : -1}}, {new: true}), info)
            }
            return await project(DBReview, DBReview.findById(id), info) as any
        }
    }
}

export default resolvers

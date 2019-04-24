import {Resolvers} from "../../generated/graphql"
import AuthError, {ErrorType} from "../AuthError"
import {DbCard} from "../card/card.model"
import graphify from "../graphify"
import makeLogger from "../logging"
import project from "../project"
import {scheduleNextReview} from "../reviewScheduling"
import DBReview from "./review.model"
import debug from "debug"

const log = debug("api:resolvers:review")
log.log = console.log.bind(console)
const logger = makeLogger("reviewResolvers")

const resolvers: Resolvers = {
    Query: {
        review: async (_, {id}, {user}, info) => {
            if(!user)
                throw new AuthError(ErrorType.Unauthenticated)

            const review = await project(DBReview, DBReview.findById(id).select("user"), info)
            const userId = review && (typeof review.user === "object" ? review.user.id : review.user)
            if(user.id !== userId)
                throw new AuthError(ErrorType.Unauthorized)

            return graphify(review as any)
        }
    },
    User: {
        nextReview: async ({id}, _, a, info) => {
            //for now, just take the oldest review
            const review = await project(DBReview, DBReview.find({user: id, nextReviewAt: {$lt: new Date()}}).sort({nextReviewAt: 1}).limit(1), info)
            return review.length > 0 ? graphify(review[0] as any) : null
        },
        reviewQueue: async ({id}, {filter}, _, info) => {
            const conditions: any = {user: id}
            filter = filter || {}
            if(filter.deck) conditions.deck = filter.deck
            if(filter.toBeReviewedBy) conditions.nextReviewAt = {$lt: filter.toBeReviewedBy}
            if(filter.boxes) conditions.box = {$in: filter.boxes}
            else conditions.box = {$gt: 0}

            let query = project(DBReview, DBReview.find(conditions), info)
            if(filter.sortBy || filter.sortDirection)
                query = query.sort({[filter.sortBy || "nextReviewAt"]: filter.sortDirection || "asc"})
            if(filter.limit) query = query.limit(filter.limit)
            if(filter.offset) query = query.skip(filter.offset)
            const result = await query
            logger.debug(result)
            return result as any
        },
        reviewsCount: async ({id}, {filter}) => {
            const conditions: any = {user: id}
            filter = filter || {}
            if(filter.deck) conditions.deck = filter.deck
            if(filter.toBeReviewedBy) conditions.nextReviewAt = {$lt: filter.toBeReviewedBy}
            if(filter.boxes) conditions.box = {$in: filter.boxes}
            else conditions.box = {$gt: 0}

            return await DBReview.countDocuments(conditions)
        },
        lessonQueue: async ({id}, {filter}, _, info) => {
            const conditions: any = {user: id, box: 0}
            filter = filter || {}
            if(filter.deck) conditions.deck = filter.deck
            let query = project(DBReview, DBReview.find(conditions), info)
            if(filter.limit) query = query.limit(filter.limit)
            if(filter.offset) query = query.skip(filter.offset)
            const reviews = await query
            log(reviews)
            return graphify(reviews as any)
        },
        lessonsCount: async ({id}) => await DBReview.countDocuments({user: id, box: 0})
    },
    Mutation: {
        submitReview: async (_, {id, field, correct}, {user}, info) => {
            if(!user)
                throw new AuthError(ErrorType.Unauthenticated)

            const reviewsCount = await DBReview.countDocuments({user: user.id, nextReviewAt: {$lt: new Date()}})
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

            const hasPronunciation = !!(review.card as DbCard).pronunciation
            const reviewedFields = review.reviewedFields
            log(reviewedFields)
            if(reviewedFields.length === 3 || (reviewedFields.length === 2 && !hasPronunciation)) {
                const nextReviewAt = scheduleNextReview(review.correct ? review.box + 1 : review.box - 1)
                log(nextReviewAt)
                return await project(DBReview, DBReview.findByIdAndUpdate(id, {$set: {reviewedFields: [], nextReviewAt, correct: true}, $inc: {box: review.correct ? 1 : -1}}, {new: true}), info)
            }
            return graphify(await project(DBReview, DBReview.findById(id), info))
        }
    }
}

export default resolvers

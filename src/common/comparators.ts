import _ from "lodash"
import {Maybe} from "../generated/graphql"

interface Comparator {
    readonly gt?: Maybe<any>
    readonly lt?: Maybe<any>
    readonly eq?: Maybe<any>
    readonly ne?: Maybe<any>
    readonly gte?: Maybe<any>
    readonly lte?: Maybe<any>
    readonly in?: Maybe<any>
    readonly nin?: Maybe<any>
    readonly all?: Maybe<any>
}

interface EqualityComparator {
    readonly eq?: Maybe<any>
    readonly ne?: Maybe<any>
    readonly in?: Maybe<any>
    readonly nin?: Maybe<any>
    readonly all?: Maybe<any>
}

interface ComparatorOptions {
    isArray?: boolean
}

export const convertComparator = ({eq: $eq, ne: $ne, lt: $lt, gt: $gt, lte: $lte, gte: $gte, in: $in, nin: $nin, all: $all}: Comparator, options: ComparatorOptions = {}) => {
    const {isArray = false} = options
    if(typeof $eq !== "undefined") return $eq
    const filters: any[] = []
    if(typeof $lt !== "undefined") filters.push({$lt})
    if(typeof $gt !== "undefined") filters.push({$gt})
    if(typeof $lte !== "undefined") filters.push({$lte})
    if(typeof $gte !== "undefined") filters.push({$gte})
    if(typeof $ne !== "undefined") filters.push({$ne})
    if(typeof $in !== "undefined") filters.push({$in})
    if(typeof $nin !== "undefined") filters.push({$nin})
    if(typeof $all !== "undefined") filters.push({$all})
    if(filters.length === 0) return undefined
    if(filters.length === 1) return filters[0]

    return isArray ? {$elemMatch: _.merge({}, filters)} : _.merge({}, filters)
}

export const convertEqualityComparator = ({eq: $eq, ne: $ne, in: $in, nin: $nin, all: $all}: EqualityComparator, options: ComparatorOptions = {}) => {
    const {isArray = false} = options
    if(typeof $eq !== "undefined") return $eq
    const filters: any[] = []
    if(typeof $ne !== "undefined") filters.push({$ne})
    if(typeof $in !== "undefined") filters.push({$in})
    if(typeof $nin !== "undefined") filters.push({$nin})
    if(typeof $all !== "undefined") filters.push({$all})
    if(filters.length === 0) return undefined
    if(filters.length === 1) return filters[0]

    return isArray ? {$elemMatch: _.merge({}, filters)} : _.merge({}, filters)
}

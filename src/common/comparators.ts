import _ from "lodash"

interface Comparator<T> {
    readonly gt?: T
    readonly lt?: T
    readonly eq?: T
    readonly gte?: T
    readonly lte?: T
}

interface ComparatorOptions {
    isArray?: boolean
}

export const convertComparator = <T>({eq, lt, gt, lte, gte}: Comparator<T>, options: ComparatorOptions = {}) => {
    const {isArray = false} = options
    if(eq) return eq
    const filters: any[] = []
    if(lt) filters.push({$lt: lt})
    if(gt) filters.push({$gt: gt})
    if(lte) filters.push({$lte: lte})
    if(gte) filters.push({$gte: gte})
    if(filters.length === 0) return undefined
    if(filters.length === 1) return filters[0]

    return isArray ? {$elemMatch: _.merge({}, filters)} : _.merge({}, filters)
}

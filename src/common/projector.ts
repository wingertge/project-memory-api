import {GraphQLResolveInfo} from "graphql"
import {fieldsMap} from "graphql-fields-list"
import {DocumentQuery, Document, ModelProperties} from "mongoose"
import _ from "lodash"
import debug from "debug"

const log = debug("api:projector")
log.log = console.log.bind(console)
//const error = debug("api:error:projector")

interface ProjectionMapping {
    [modelName: string]: string | DBMapping | ProjectionMapping
}

interface DBMapping {
    name?: string
    mappingType?: DBMappingType
    ref?: string
    customQuery?: (query: DocumentQuery<any, any>) => DocumentQuery<any, any>
}

export enum DBMappingType {
    Plain,
    Nested,
    Reference,
    Custom,
    Ignore
}

interface PopulateArgs {
    path: string
    select: string[]
    populate: Populate[]
}

interface Populate {
    path: string
    select: string
    populate: Populate[]
}

const handleFieldShallow = <TModel, TResult>(mappings: ProjectionMapping,
                                             currentQuery: DocumentQuery<any, any>,
                                             fieldDef: [string, object] | [string, boolean],
                                             currentModel: string,
                                             currentPath: string = "",
                                             currentModelPath: string = "") => {
    const [key, value] = fieldDef
    if(value === false) return currentQuery.select(currentPath + key)

    log("Getting mapping from " + [currentModel, ...currentModelPath.split(".").filter(a => a !== ""), key].join("."))
    const mapping = _.get(mappings, [currentModel, ...currentModelPath.split(".").filter(a => a !== ""), key])
    if(!mapping)
        return currentQuery.select(currentPath + key === "id" ? "_id" : key)
    log("Found mapping")
    if(typeof value !== "object") {
        return currentQuery.select(currentPath + (mapping.name || mapping))
    } else {
        const mappingType = (mapping as DBMapping).mappingType || DBMappingType.Plain
        const path = currentPath + ((mapping as DBMapping).name || key)

        switch (mappingType) {
            case DBMappingType.Ignore:
                return currentQuery
            case DBMappingType.Plain:
                return currentQuery.select(path)
            case DBMappingType.Custom:
                return ((mapping as DBMapping).customQuery! as any)(currentQuery)
            case DBMappingType.Nested:
                const ref = (mapping as DBMapping).ref
                let query = currentQuery.select(path)
                for(const childKey of Object.keys(value)) {
                    query = handleFieldShallow(mappings, query, [childKey, value[childKey]], ref!, path  + ".")!
                }
                return query
            case DBMappingType.Reference:
                const populateObj = {
                    path,
                    populate: [],
                    select: []
                }
                Object.keys(value).forEach(childSelector => handlePopulate(mappings, populateObj, [childSelector, value[childSelector]], (mapping as DBMapping).ref!))
                log("Populating like this:")
                log({
                    path: populateObj.path,
                    populate: populateObj.populate,
                    select: populateObj.select.join(" ")
                })
                return currentQuery.select(populateObj.path).populate({
                    path: populateObj.path,
                    populate: populateObj.populate,
                    select: populateObj.select.join(" ")
                })
        }
    }
}

const handlePopulate = (mappings: ProjectionMapping, populateObj: PopulateArgs, fieldDef: [string, object] | [string, boolean], currentModel: string, currentPath: string = "", currentModelPath: string = "") => {
    const [key, value] = fieldDef
    if(value === false) {
        populateObj.select.push(key)
        return
    }

    log("Getting mapping from " + [currentModel, ...currentModelPath.split(".").filter(a => a !== ""), key].join("."))
    const mapping = _.get(mappings, [currentModel, ...currentModelPath.split(".").filter(a => a !== ""), key])
    if(!mapping) {
        populateObj.select.push(key === "id" ? "_id" : key)
        return
    }
    log("Found mapping")
    const name = typeof mapping === "object" ? (mapping as DBMapping).name || key : mapping as string
    if(typeof value !== "object") {
        populateObj.select.push(currentPath + name)
        return
    } else {
        const mappingType = (mapping as DBMapping).mappingType || DBMappingType.Plain

        switch (mappingType) {
            case DBMappingType.Ignore:
                return
            case DBMappingType.Plain:
                populateObj.select.push(currentPath + name)
                Object.keys(value).forEach(childKey => handlePopulate(mappings, populateObj, [childKey, value[childKey]], currentModel, currentPath + name + ".", currentModelPath + name + "."))
                return
            case DBMappingType.Custom:
                throw new Error("Custom query in referenced type not allowed.")
            case DBMappingType.Nested: {
                const ref = (mapping as DBMapping).ref
                populateObj.select.push(name)
                Object.keys(value).forEach(childSelector => handlePopulate(mappings, populateObj, [childSelector, value[childSelector]], ref!, currentPath + name + "."))
                return
            }
            case DBMappingType.Reference: {
                const ref = (mapping as DBMapping).ref
                const nextPopulateObj = {
                    path: name,
                    populate: [],
                    select: []
                }
                Object.keys(value).forEach(childSelector => handlePopulate(mappings, nextPopulateObj, [childSelector, value[childSelector]], ref!))
                populateObj.select.push(name)
                populateObj.populate.push({
                    path: nextPopulateObj.path,
                    populate: nextPopulateObj.populate,
                    select: nextPopulateObj.select.join(" ")
                })
                log("Populating nested like this:")
                log({
                    path: nextPopulateObj.path,
                    populate: nextPopulateObj.populate,
                    select: nextPopulateObj.select.join(" ")
                })
                return
            }
        }
    }
}

const projectFun = <TModel, TResult = TModel | null>(
    mapping: ProjectionMapping,
    modelName: string | ModelProperties,
    query: DocumentQuery<TResult, TModel & Document>,
    fields: any
): DocumentQuery<TResult, TModel & Document> => {
    let currentQuery = query
    const fieldSet = fields
    const schemaName = typeof modelName === "object" || typeof modelName === "function" ? modelName.modelName : modelName as string
    for(const key of Object.keys(fieldSet)) {
        currentQuery = handleFieldShallow(mapping, currentQuery, [key, fieldSet[key]], schemaName)
    }
    return currentQuery
}

export const rawProjector = (mapping: ProjectionMapping) =>
    <TModel, TResult = TModel>(modelName: string, query: DocumentQuery<TResult, TModel & Document>, fields: any): DocumentQuery<TResult | null, TModel & Document> =>
        projectFun(mapping, modelName, query, fields)

export default (mapping: ProjectionMapping) => <TModel, TResult = TModel | null>(
    modelName: string | ModelProperties,
    query: DocumentQuery<TResult, TModel & Document>,
    info: GraphQLResolveInfo
): DocumentQuery<TResult, TModel & Document> => projectFun(mapping, modelName, query, fieldsMap(info))

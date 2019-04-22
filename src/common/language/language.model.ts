import {Document, model, Schema} from "mongoose"
import {Language} from "../../generated/graphql"
import GraphConverter from "../GraphConverter"

type Base = Document & GraphConverter

export interface DbLanguage extends Base {
    id: string
    name: string
    nativeName: string
    languageCode: string
    hasConverter: boolean
    requiresIME: boolean
    hasPronunciation: boolean
}

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    nativeName: {
        type: String,
        required: true
    },
    languageCode: {
        type: String,
        required: true
    },
    hasConverter: {
        type: Boolean,
        required: true
    },
    requiresIME: {
        type: Boolean,
        required: true
    },
    hasPronunciation: {
        type: Boolean,
        required: true
    }
})

schema.set("toObject", {virtuals: true})
schema.set("toJSON", {virtuals: true})

schema.method("toGraph", function(this: any) {
    return JSON.parse(JSON.stringify(this))
})

export default model<DbLanguage>("Language", schema)

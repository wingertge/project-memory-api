import {Document, model, Schema} from "mongoose"
import {Language} from "../../generated/graphql"

export interface DbLanguage extends Document {
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

export const DBLanguage = model<DbLanguage>("Language", schema)
export default DBLanguage

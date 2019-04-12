import {model, Schema} from "mongoose"

const serverSchema = new Schema({
    _id: String,
    users: {
        type: [{
            _id: String,
            lastMessageAt: Date
        }],
        default: []
    }
})

//makes it so id is available alongside _id
serverSchema.set("toObject", {virtuals: true})

export default model("Server", serverSchema)

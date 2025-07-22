import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
    author: {type: String, require: true},
    createdAt: {type: Date, default: Date.now}
})

export default mongoose.model("Post", postSchema)
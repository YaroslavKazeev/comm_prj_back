const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const commentSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    fromPost: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    }


})

module.exports = mongoose.model("comment", commentSchema)
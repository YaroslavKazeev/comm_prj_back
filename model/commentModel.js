const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const moment = require("moment");

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
    },
    userName:{
        type:String,
        required: true
    },
    creat_at : {
        type: Date,
        default: Date.now,
        get: function(createAt){
            return moment(createAt).format('MMMM Do YYYY, h:mm:ss ')
        }
    },


},{timestamps: true})

module.exports = mongoose.model("comment", commentSchema)
const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const moment = require('moment/moment')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }, creat_at : {
        type: Date,
        default: Date.now,
        get: function(createAt){
            return moment(createAt).format('MMMM Do YYYY, h:mm:ss a')
        }
    },


},{timestamps: true})

module.exports = mongoose.model("post", postSchema)
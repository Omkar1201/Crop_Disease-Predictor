const mongoose = require('mongoose')
const Post = require('./Postmodel')
const User = require('./User')
const Commentschema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        commentBody: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Comment', Commentschema)
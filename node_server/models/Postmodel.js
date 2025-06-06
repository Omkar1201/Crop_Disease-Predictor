const mongoose = require('mongoose')
const Comment = require('./Commentmodel')
const User = require('./User')
const Postschema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ['diseases', 'gardening', 'tools'],
            required: true
        },
        content: {
            type: String,
            required: true
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        views: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Post', Postschema)
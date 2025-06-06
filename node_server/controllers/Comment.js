const mongoose = require('mongoose')
const post = require('../models/Postmodel')
const comment = require('../models/Commentmodel')
const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { commentBody } = req.body
        const { userId } = req.user
        if (commentBody.trim() == "") {
            return res.status(400).json({
                success: false,
                message: 'Comment Body is Required'
            })
        }
        
        const responseData = await comment.create({ postId, author: userId, commentBody })

        const updatedPostData = await post
            .findByIdAndUpdate(
                postId,
                { $push: { comments: responseData._id } },
                { new: true }
            )
            .populate({
                path: 'author',
                select: '-password',
            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: '-password',
                },
            })
            .exec();

        res.status(200).json({
            success: true,
            updatedPostData,
            message: 'comment created successfully'
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = { createComment }
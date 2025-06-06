const mongoose = require('mongoose')
const post = require('../models/Postmodel')
const comment = require('../models/Commentmodel')

const createPost = async (req, res) => {
    try {
        const { formData } = req.body
        const { userId } = req.user
        const { title, content, category } = formData

        const newPost = new post({ author: userId, title, category, content });
        const savedPost = await newPost.save();
        const populatedPost = await savedPost.populate({ path: 'author', select: '-password' });

        const responseData = populatedPost;

        res.status(200).json({
            success: true,
            responseData,
            message: 'Post created successfully'
        })
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const getAllpost = async (req, res) => {
    try {
        const allPosts = await post.find({}).populate({ path: 'author', select: '-password' })
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: '-password'
                }
            }).exec()

        res.status(200).json({
            success: true,
            allPosts,
            message: "Posts retrived succesfully!"
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const postViewed = async (req, res) => {
    try {
        const { postId } = req.params;

        const updatedPost = await post.findByIdAndUpdate(
            postId,
            { $inc: { views: 1 } },
            { new: true } // Returns the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Post viewed successfully!"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = { createPost, getAllpost, postViewed }
import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    content: String,
    author: String,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, { timestamps: true })

module.exports = mongoose.model('Comment', CommentSchema)

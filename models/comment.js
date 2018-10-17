import mongoose from 'mongoose'
import User from './user'

const CommentSchema = new mongoose.Schema({
    content: String,
    author: String,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, { timestamps: true })

module.exports = mongoose.model('Comment', CommentSchema)

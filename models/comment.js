// TODO: comment should have postid and commentid to identify which is the parentelement, in template
// if object has postid do this/ commentid do that
import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    content: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
}, { timestamps: true })

module.exports = mongoose.model('Comment', CommentSchema)

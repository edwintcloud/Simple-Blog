import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
     title: String,
     content: String,
     authorId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
     }
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema)

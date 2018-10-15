import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
     title: String,
     content: String,
     author: String
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema)

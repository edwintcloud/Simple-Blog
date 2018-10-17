import mongoose from 'mongoose'
import User from './user'

const PostSchema = new mongoose.Schema({
     title: String,
     content: String,
     author: String
}, { timestamps: true })

// create text index to search with
PostSchema.index({
    '$**': 'text'
})

module.exports = mongoose.model('Post', PostSchema)

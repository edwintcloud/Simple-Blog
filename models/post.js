import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
     title: String,
     content: String,
     author: String
}, { timestamps: true })

// create text index to search with
PostSchema.index({
    title: 'text',
    content: 'text',
    author: 'text'
})

module.exports = mongoose.model('Post', PostSchema)

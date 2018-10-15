import chai from 'chai'
import chaiHttp from 'chai-http'
import mongoose from 'mongoose'
import app from '../index'
import Post from '../models/post'
const should = chai.should()

// test post
const testPost = {
    "title": "chaiTestPost",
    "content": "blah blah blah",
    "authorId": mongoose.Types.ObjectId()
}

// setup chai to use http assertion
chai.use(chaiHttp)

describe('Posts', () => {

    // delete our test posts when finished
    after(async () => {
        try {
            await Post.deleteMany({ title: 'chaiTestPost' })
        } catch (e) {
            throw e
        }
    })
})

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
    after(() => {
        Post.deleteMany({ title: 'chaiTestPost' }).exec((err) => {
            console.log(err)
        })
    })

    // SHOW ALL TEST
    it('should index all Posts on /posts GET', (done) => {
        chai.request(app).get(`/posts`).end((err, res) => {
            res.should.have.status(200)
            res.should.be.html
            done()
        })
    })

    // SHOW ONE TEST
    it('should show one Post on /posts?_id= GET', (done) => {
        const post = new Post(testPost)
        post.save((err, post) => {
            chai.request(app).get(`/posts?_id=${post._id}`).end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
        })
    })

    // NEW TEST
    it('should render create new Post form on /posts/new GET', (done) => {
        chai.request(app).get(`/post/new`).end((err, res) => {
            res.should.have.status(200)
            res.should.be.html
            done()
        })
    })

    // CREATE TEST
    it('should create a single post on /posts POST', (done) => {
        chai.request(app).post(`/posts`).send(testPost).end((err, res) => {
            res.should.have.status(200)
            res.should.be.json
            done()
        })
    })
})

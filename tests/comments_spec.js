import chai from 'chai'
import chaiHttp from 'chai-http'
import mongoose from 'mongoose'
import app from '../index'
import Comment from '../models/comment'
const should = chai.should()

// test comment
const testComment = {
    "content": "blah blah blah",
    "author": "chaiTestComment",
    "postId": mongoose.Types.ObjectId()
}

// configure chai to use http assertion
chai.use(chaiHttp)

// start our tests
describe('Comments', () => {

    // delete test comments when we are finished with our tests
    after(() => {
        Comment.deleteMany({ author: 'chaiTestComment' }).exec((err) => {
            console.log(err)
        })
    })

    // GET ONE TEST
    it('should show a single comment on /comments?_id= GET', (done) => {
        const comment = new Comment(testComment)
        comment.save((err, comment) => {
            chai.request(app).get(`/comments?_id=${comment._id}`).end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                done()
            })
        })
    })

    // GET ALL TEST
    it('should show all comments on /comments GET', (done) => {
        chai.request(app).get(`/comments`).end((err, res) => {
            res.should.have.status(200)
            res.should.be.json
            done()
        })
    })

    // CREATE TEST
    it('should create a single comment on /comments POST', (done) => {
        chai.request(app).post(`/comments`).send(testComment).end((err, res) => {
            res.should.have.status(200)
            res.should.be.json
            done()
        })
    })

    // UPDATE TEST
    it('should update a single comment on /comments?_id= PUT', (done) => {
        const comment = new Comment(testComment)
        const updatedComment = { "content": "blah updated blah" }
        comment.save((err, comment) => {
            chai.request(app).put(`/comments?_id=${comment._id}`).send(updatedComment).end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                done()
            })
        })
    })

    // DELETE TEST
    it('should delete a single comment on /comment?_id= DELETE', (done) => {
        const comment = new Comment(testComment)
        comment.save((err, comment) => {
            chai.request(app).delete(`/comments?_id=${comment._id}`).end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                done()
            })
        })
    })

})

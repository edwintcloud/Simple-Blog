import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index'
const should = chai.should()

// setup chai to use http assertion
chai.use(chaiHttp)

// start our tests
describe('API', () => {

    // GET COMMENTS TEST
    it('should return json for request at /api/comments GET', (done) => {
        chai.request(app).get(`/api/comments`).end((err, res) => {
            res.should.have.status(200)
            res.should.be.json
            done()
        })
    })

    // GET POSTS TEST
    it('should return json for request at /api/posts GET', (done) => {
        chai.request(app).get(`/api/posts`).end((err, res) => {
            res.should.have.status(200)
            res.should.be.json
            done()
        })
    })


})

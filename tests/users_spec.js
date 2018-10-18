import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index'
import User from '../models/user'
const should = chai.should()

// Test user
const testUser = {
    "screenName": "chaiTestUser",
    "email": "email@asd.com",
    "password": "password",
    "confirmPassword": "password"
}

// setup chai to use http assertion
chai.use(chaiHttp)

describe('Users', () => {

    // delete our test users when the tests are finished
    after( () => {
        User.deleteMany({ screenName: 'chaiTestUser' }).exec((err) => {
            console.log(err)
        })
    })

    // CREATE TEST
    it('should create a single user on /users POST', (done) => {
        chai.request(app).post(`/users`).send(testUser).end((err, res) => {
            res.should.have.status(200)
            res.should.not.be.json
            res.headers['set-cookie'].should.not.be.empty
            done()
        })
    })

    // LOGIN TEST
    it('should set session for a single user on /users/login POST', (done) => {
        const user = new User(testUser)
        user.save((err, user) => {
            chai.request(app).post(`/users/login`).send(testUser).end((err, res) => {
                res.should.have.status(200)
                res.should.not.be.json
                res.headers['set-cookie'].should.not.be.empty
                done()
            })
        })
    })

    // LOGOUT TEST
    it('should destroy session on /users/logout POST', (done) => {
        chai.request(app).post(`/users/logout`).end((err, res) => {
            res.should.have.status(200)
            should.equal(res.headers['set-cookie'], undefined)
            done()
        })
    })
})

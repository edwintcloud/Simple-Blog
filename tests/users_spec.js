import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index'
import User from '../models/user'
const should = chai.should()

// Test user
const testUser = {
    "screenName": "chaiTestUser",
    "email": "email@asd.com",
    "password": "password"
}

// setup chai to use http assertion
chai.use(chaiHttp)

describe('Users', () => {

    // delete our test users when the tests are finished
    after(async () => {
        try {
            await User.deleteMany({ screenName: 'chaiTestUser' }).exec()
        } catch (e) {
            throw e
        }
    })

    // CREATE TEST
    it('should create a single user on /users POST', async () => {
        try {
            const user = await User.create(new User(testUser))
            chai.request(app).post(`/users`).send(user).then((res) => {
                res.should.have.status(200)
                res.should.be.json
            })
        } catch (e) {
            throw e
        }
    })

    // LOGIN TEST
    it('should set session for a single user on /users/login POST', async () => {
        try {
            const user = await User.create(new User(testUser))
            chai.request(app).post(`/users/login`).send(user).then((res) => {
                res.should.have.status(200)
                res.headers['set-cookie'].should.not.be.empty
            })
        } catch (e) {
            throw e
        }
    })

    // LOGOUT TEST
    it('should destroy session on /users/logout POST', async () => {
        try {
            chai.request(app).post(`/users/logout`).then((res) => {
                res.should.have.status(200)
                should.equal(res.headers['set-cookie'], undefined)
            })
        } catch (e) {
            throw e
        }
    })
})

import User from '../models/user'
import Post from '../models/post'

// gets a users profile by id
exports.profile = (req, res) => {
    res.render('users-profile')
}

// creates a user
exports.create = (req, res) => {
    User.register(req.body).then((user) => {
        if(user.reasons) {
            res.status(200).send({ reasons: user.reasons })
        } else {
            req.session.userId = user._id
            req.session.screenName = user.screenName
            res.status(200).send()
        }
    })
}

// login user
exports.login = (req, res) => {
    User.authenticate(req.body.email, req.body.password).then((user) => {
        if(user.reason) {
            res.status(200).send({ reason: user.reason })
        } else {
            req.session.userId = user._id
            req.session.screenName = user.screenName
            res.status(200).send()
        }
    })
}

// logout user
exports.logout = (req, res) => {
    req.session.destroy()
    res.status(200).send()
}

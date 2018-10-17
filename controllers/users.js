import User from '../models/user'
import Post from '../models/post'
import multer from 'multer'
import jimp from 'jimp'

// multer setup
const uploader = multer({ dest: 'uploads/', storage: multer.memoryStorage() }).single('avatar')

// gets a users profile by id
exports.profile = (req, res) => {
    if(req.session.screenName) {
        User.find({ screenName: req.session.screenName }).limit(1).then((users) => {
            res.render('users-profile', { activity: users[0].activity.reverse() })
        })
    } else {
        res.render('users-profile')
    }
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

// process uploaded file and save compressed version on server
exports.upload = (req, res) => {
    if(req.query._id) {

        // make sure our query term is a valid object id
        if(!/^[0-9a-fA-F]{24}$/.test(req.query._id)) {
            return res.status(404).render('404', { reason: 'Invalid Post Id or query term!' })
        }

        uploader(req, res, function(err) {
            if(err) {
                res.send('Error while uploading.');
            }
            const ext = /(?:\.([^.]+))?$/.exec(req.file.originalname)[1]
            if(ext == 'png' || ext == 'jpg' || ext == 'jpeg') {
                jimp.read(req.file.buffer).then((file) => {
                    file.resize(128, 128)
                        .quality(60)
                        .write(`assets/uploaded/${req.session.screenName}.png`)
                    const action = {
                        description: "Avatar updated"
                    }
                    User.updateOne({ screenName: req.session.screenName }, { $push: { activity: action } }).then((result) => {
                        res.redirect(`/users/profile`)
                    })
                }).catch((e) => {
                    console.error(e.message)
                })
            } else {
                res.redirect(`/users/profile`)
            }
        })

    } else {
        res.redirect(`/`)
    }
}

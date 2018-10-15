import Comment from '../models/comment'

// get all comments or if id specified get one
exports.get = (req, res) => {
    if(req.query._id) {
        Comment.find({ _id: req.query._id }).limit(1).then((comments) => {
            res.status(200).send(comments[0])
        }).catch((e) => {
            res.status(400).send(e.message)
            console.error(e.message)
        })
    } else {
        Comment.find().then((comments) => {
            res.status(200).send(comments)
        }).catch((e) => {
            res.status(400).send(e.message)
            console.error(e.message)
        })
    }
}

// render new comments form
exports.new = (req, res) => {
    res.render('comments-new')
}

// render edit comment form
exports.edit = (req, res) => {
    res.render('comments-edit')
}

// create a new comment
exports.create = (req, res) => {
    Comment.create(req.body).then((comment) => {
        res.status(200).send(comment)
    }).catch((e) => {
        res.status(400).send(e.message)
        console.error(e.message)
    })
}

// update a comment
exports.update = (req, res) => {
    Comment.updateOne({ _id: req.body._id }, req.body).then((comment) => {
        res.status(200).send(comment)
    }).catch((e) => {
        res.status(400).send(e.message)
        console.error(e.message)
    })
}

// delete a comment
exports.delete = (req, res) => {
    Comment.deleteOne({ _id: req.body._id }).then((comment) => {
        res.status(200).send(comment)
    }).catch((e) => {
        res.status(400).send(e.message)
        console.error(e.message)
    })
}

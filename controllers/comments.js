import Comment from '../models/comment'

// get all comments or if id specified get one
exports.get = (req, res) => {

    if(req.query._id) {

        // make sure our query term is a valid object id
        if(!/^[0-9a-fA-F]{24}$/.test(req.query._id)) {
            return res.status(404).render('404', { reason: 'Invalid Post Id or query term!' })
        }
        
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

    // make sure our query term is a valid object id
    if(!/^[0-9a-fA-F]{24}$/.test(req.query._id)) {
        return res.status(404).render('404', { reason: 'Invalid Post Id or query term!' })
    }

    Comment.updateOne({ _id: req.query._id }, req.body).then((result) => {
        res.status(200).send(result)
    }).catch((e) => {
        res.status(400).send(e.message)
        console.error(e.message)
    })
}

// delete a comment
exports.delete = (req, res) => {

    Comment.deleteOne({ _id: req.query._id }).then((result) => {
        res.status(200).send(result)
    }).catch((e) => {
        res.status(400).send(e.message)
        console.error(e.message)
    })
}

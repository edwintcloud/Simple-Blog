import Comment from '../models/comment'
import Post from '../models/comment'

// gets all comments or result of query
exports.getComments = (req, res) => {

    if(Object.keys(req.query).length === 0) {
        Comment.find().then((comments) => {
            return res.send(comments.pretty)
        })
    } else {

        if(req.query._id && !/^[0-9a-fA-F]{24}$/.test(req.query._id)) {
                return res.send('Invalid query term!')
        }

        Comment.find({ $and: req.query.toArr }).then((comments) => {
            return res.send(comments.pretty)
        })
    }

}

// gets all posts or result of query
exports.getPosts = (req, res) => {
    if(Object.keys(req.query).length === 0) {
        Post.find().then((posts) => {
            return res.send(posts.pretty)
        })
    } else {

        if(req.query._id && !/^[0-9a-fA-F]{24}$/.test(req.query._id)) {
                return res.send('Invalid query term!')
        }

        Post.find({ $and: req.query.toArr }).then((posts) => {
            return res.send(posts.pretty)
        })
    }
}

//toArr property
Object.defineProperty(Object.prototype, 'toArr', {
    get() {
        var result = []
        for (var key in this) {
            var obj = {}
            obj[key] = this[key]
            result.push(obj)
        }
        return result
    }
})

//pretty property
Object.defineProperty(Array.prototype, 'pretty', {
    get() {
        if(this.length > 1) {
            return this
        } else {
            return this[0]
        }
    }
})

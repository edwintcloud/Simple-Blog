// import our model
import Post from '../models/post'
import Comment from '../models/comment'
import User from '../models/user'

// get all our post and render the index
exports.get = (req, res) => {
    try {
        if(req.query._id) {

            // make sure our query term is a valid object id
            if(!/^[0-9a-fA-F]{24}$/.test(req.query._id)) {
                return res.status(404).render('404', { reason: 'Invalid Post Id or query term!' })
            }

            Post.find({ _id: req.query._id }).limit(1).then((posts) => {
                if(posts.length < 1) return res.send('deleted')
                Comment.find({ postId: posts[0]._id }).then((comments) => {
                    res.render('posts-show', { post: posts[0], comments: comments })
                })
            })
        } else if(req.query.screenName) {
            Post.find({ author: req.query.screenName }).then((posts) => {
                res.render('index', { posts: posts })
            }).catch((e) => {
                console.error(e.message)
            })
        } else if(req.query.search) {
            Post.find({ $text: { $search: req.query.search } }).then((posts) => {
                res.status(200).send(posts)
            }).catch((e) => {
                res.status(400).send(e.message)
                console.error(e.message)
            })
        } else {
            Post.find().then((posts) => {
                res.render('index', { posts: posts })
            })
        }
    } catch(e) {
        return console.error(e.message)
    }

}

// create a new post
exports.create = (req, res) => {
    Post.create(req.body).then((post) => {
        const action = {
            description: "Post created",
            postId: post._id
        }
        User.updateOne({ screenName: req.session.screenName }, { $push: { activity: action } }).then((userResult) => {
            res.status(200).send(post)
        })
    }).catch((e) => {
        res.status(400).send(e.message)
        console.error(e.message)
    })
}

// render new post form
exports.new = (req, res) => {
    res.render('posts-new')
}

// render edit post
exports.edit = (req, res) => {

    // make sure our query term is a valid object id
    if(!/^[0-9a-fA-F]{24}$/.test(req.query._id)) {
        return res.status(404).render('404', { reason: 'Invalid Post Id or query term!' })
    }

    Post.find({ _id: req.query._id }).limit(1).then((posts) => {
        res.render('posts-edit', { post: posts[0] })
    }).catch((e) => {
        console.error(e.message)
    })
}

// update post
exports.update = (req, res) => {

    // make sure our query term is a valid object id
    if(!/^[0-9a-fA-F]{24}$/.test(req.query._id)) {
        return res.status(404).render('404', { reason: 'Invalid Post Id or query term!' })
    }

    Post.updateOne({ _id: req.query._id }, req.body).then((result) => {
        const action = {
            description: "Post updated",
            postId: req.query._id
        }
        User.updateOne({ screenName: req.session.screenName }, { $push: { activity: action } }).then((userResult) => {
            res.status(200).send(result)
        })
    }).catch((e) => {
        res.status(400).send(e.message)
        console.error(e.message)
    })
}

// delete posts
exports.delete = (req, res) => {

    // make sure our query term is a valid object id
    if(!/^[0-9a-fA-F]{24}$/.test(req.query._id)) {
        return res.status(404).render('404', { reason: 'Invalid Post Id or query term!' })
    }

    Post.deleteOne({ _id: req.query._id }).then((result) => {
        res.status(200).send(result)
    }).catch((e) => {
        res.status(400).send(e.message)
        console.error(e.message)
    })
}

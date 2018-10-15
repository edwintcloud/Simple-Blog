// import our model
import Post from '../models/post'
import Comment from '../models/comment'

// get all our post and render the index
exports.get = (req, res) => {
    try {
        if(req.query._id) {

            // make sure our query term is a valid object id
            if(!/^[0-9a-fA-F]{24}$/.test(req.query._id)) {
                return res.status(404).render('404', { reason: 'Invalid Post Id or query term!' })
            }

            // const comments = await Comment.find()
            Post.find({ _id: req.query._id }).limit(1).then((posts) => {
                res.render('posts-show', { post: posts[0] })
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
        res.status(200).send(post)
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
    res.render('posts-edit')
}

// update post
exports.update = (req, res) => {
    Post.updateOne({ _id: req.body._id }, req.body).then((post) => {
        res.status(200).send(post)
    }).catch((e) => {
        res.status(400).send(e.message)
        console.error(e.message)
    })
}

// delete posts
exports.delete = (req, res) => {
    Post.deleteOne({ _id: req.body._id }).then((post) => {
        res.status(200).send()
    })catch((e) => {
        res.status(400).send(e.message)
        console.error(e.message)
    })
}

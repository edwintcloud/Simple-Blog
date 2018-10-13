// import our model
import Post from '../models/post'
import Comment from '../models/comment'

// get all our post and render the index
exports.get = async (req, res) => {
    try {
        const posts = await Post.find()
        const comments = await Comment.find()
        res.render('index', { posts: posts, comments: comments })
    } catch(e) {
        return console.error(e.message)
    }

}

// create a new post
exports.new = (req, res) => {
    Post.create(req.body).then((post) => {
        res.status(200).send(post)
    }).catch((e) => {
        res.status(400).send(e.message)
        console.error(e.message)
    })
}

exports.create = (req, res) => {
    res.render('modules/posts/posts-show')
}

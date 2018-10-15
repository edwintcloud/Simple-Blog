const router = require('express').Router()

// import our controllers
import posts from './controllers/posts'
import users from './controllers/users'
import comments from './controllers/comments'

// router middleware that will be run on all requests
router.use((req, res, next) => {
    res.locals.blogName = "My Blog"
    res.locals.session = req.session
    next()
})

// posts routes
router.route('/posts')
    .get(posts.get)
    .post(posts.create)
    .put(posts.update)
    .delete(posts.delete)
router.get('/', posts.get)
router.get('/posts/new', posts.new)
router.get('/posts/edit', posts.edit)

// comments routes
router.post('/comments', comments.create)

// users routes
router.post('/users', users.create)
router.post('/users/login', users.login)
router.post('/users/logout', users.logout)

// catch all redirect to 404
router.all('*', (req,res) => { res.render('404', { reason: 'Page not found!' }) })

// export our router to be used by app
module.exports = router

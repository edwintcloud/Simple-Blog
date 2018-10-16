const router = require('express').Router()

// import our controllers
import posts from './controllers/posts'
import users from './controllers/users'
import comments from './controllers/comments'
import api from './controllers/api'

// router middleware that will be run on all requests
router.use((req, res, next) => {
    res.locals.blogName = "My Blog"
    res.locals.session = req.session
    res.locals.url = req.originalUrl.split('=')[0]
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
router.route('/comments')
    .get(comments.get)
    .post(comments.create)
    .put(comments.update)
    .delete(comments.delete)

// users routes
router.post('/users', users.create)
router.post('/users/login', users.login)
router.post('/users/logout', users.logout)
router.get('/users/profile', users.profile)
router.post('/users/profile/upload', users.upload)

// api routes
router.get('/api/comments', api.getComments)
router.get('/api/posts', api.getPosts)

// catch all redirect to 404 or send json response
router.all('*', (req,res) => {
    if(req.is('application/json')) {
        res.send('Invalid request!')
    } else {
        res.status(400).render('404', { reason: 'Page not found!' })
    }
 })

// export our router to be used by app
module.exports = router

const router = require('express').Router()

// import our controllers
import posts from './controllers/posts'
import users from './controllers/users'

// router middleware that will be run on all requests
router.use((req, res, next) => {
    res.locals.blogName = "My Blog"
    res.locals.session = req.session
    next()
})

// posts routes
router.get('/', posts.get)
router.get('/posts/new', posts.create)

// users routes
router.post('/users', users.create)
router.post('/users/login', users.login)
router.post('/users/logout', users.logout)

// export our router to be used by app
module.exports = router

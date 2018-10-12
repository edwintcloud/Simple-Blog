const router = require('express').Router()

// import our controllers
import posts from './controllers/posts'

// router middleware that will be run on all requests
router.use((req, res, next) => {
    res.locals.blogName = "My Blog"
    next()
})

// posts routes
router.get('/', posts.get)

// export our router to be used by app
module.exports = router

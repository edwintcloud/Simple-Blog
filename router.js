const router = require('express').Router()

// import our controllers
import posts from './controllers/posts'

// posts routes
router.get('/', posts.get)

// export our router to be used by app
module.exports = router

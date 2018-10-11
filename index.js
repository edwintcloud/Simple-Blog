// import our node modules
import express from 'express'
import nunjucks from 'nunjucks'
import bodyParser from 'body-parser'
const app = express()

// custom imports
import router from './router'

// configure nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// configure express
app.set('view engine', 'njk')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('./assets'))

// set a virtual path for uploaded files
app.use('/uploaded', express.static('./assets/uploaded'))

// use our router for routing
app.use(router)

// start our app and listen for requests
app.listen('3000', () => {
    console.log('App started on port 3000')
})

// export our app to be used for tests
module.exports = app

// import our node modules
import 'babel-polyfill'
import express from 'express'
import nunjucks from 'nunjucks'
import bodyParser from 'body-parser'
import session from 'express-session'
import mongoose from 'mongoose'
const MongoStore = require('connect-mongo')(session)
const app = express()

// custom imports
import router from './router'

// connect to database
mongoose.connect(`mongodb://localhost/simple-blog`, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

// setup express session
app.use(session({
    secret: 'pinkflamingos99',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000  // 30 minutes
    },
    store: new MongoStore({
        mongooseConnection: db
    })
}))

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

// import our node modules
import 'babel-polyfill'
import express from 'express'
import nunjucks from 'nunjucks'
import bodyParser from 'body-parser'
import session from 'express-session'
import mongoose from 'mongoose'
import moment from 'moment'
import favicon from 'express-favicon'
const MongoStore = require('connect-mongo')(session)
const app = express()

// custom imports
import router from './router'

// connect to database
mongoose.connect(`mongodb://localhost/simple-blog` || process.env.MONGODB_URI, { useNewUrlParser: true })
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
var env = nunjucks.configure('views', {
    autoescape: true,
    express: app
})
env.addFilter('date', (str, format) => {
    return moment(str).format(format)
})
env.addFilter('background', (str, index, length) => {
    var result = ""
    if('image' in str) {
        // return image as background style tag
    } else {
        let c = randomColor(100, 20, 0.2, length)
        result = `background-color:${c[index]};`
    }
    return result
})

function randomColor (saturation, lightness, alpha, amount) {
  let colors = []
  let huedelta = Math.trunc(360 / amount)

  for (let i = 0; i < amount; i++) {
    let hue = i * huedelta
    colors.push(`hsla(${hue},${saturation}%,${lightness}%,${alpha})`)
  }

  return colors
}

// configure express
app.set('view engine', 'njk')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('./assets'))
app.use(favicon(__dirname + '/assets/core/images/favicon.png'))

// set a virtual path for uploaded files
app.use('/uploaded', express.static('./assets/uploaded'))

// use our router for routing
app.use(router)

// start our app and listen for requests
app.listen('3000' || process.env.PORT, () => {
    console.log('App started on port 3000')
})

// export our app to be used for tests
module.exports = app

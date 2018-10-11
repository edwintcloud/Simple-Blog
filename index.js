// import our node modules
import express from 'express'
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

// start our app and listen for requests
app.listen('3000', () => {
    console.log('App started on port 3000')
})

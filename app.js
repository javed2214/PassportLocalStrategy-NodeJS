if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
require('./models/db')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const bodyParser = require('body-parser')

require('./passport-config')(passport)

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(flash())

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 3600 * 1000         // 1 hour
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', require('./routes/route'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is Running at PORT: ${PORT}`)
})
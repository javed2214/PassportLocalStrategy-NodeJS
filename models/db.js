const mongoose = require('mongoose')
const DB_URL = process.env.DATABASE_URL

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if(!err){
        console.log('DB Connected Successfully')
    } else{
        console.log('Error in DB Connection')
    }
})

require('./user-model')
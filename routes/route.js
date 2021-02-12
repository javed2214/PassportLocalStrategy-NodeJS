const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')
const bcrypt = require('bcrypt')

checkAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect('/profile')
    }
    next()
}

router.get('/', checkAuthenticated, (req, res) => {
    res.render('index')
})

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    var user = new User()
    user.username = req.body.username
    user.email = req.body.email
    var hashedPassword = await bcrypt.hash(req.body.password, 10)
    user.password = hashedPassword

    await user.save()
    res.redirect('/login')
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
})

router.get('/profile', checkAuthenticated, (req, res) => {
    res.render('profile', { user: req.user })
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})

module.exports = router
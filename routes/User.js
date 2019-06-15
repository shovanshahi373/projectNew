const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/login', (req, res) => {
    res.render('login.ejs', {
        title: 'login'
    })
})
router.get('/register', (req, res) => {
    res.render('register.ejs', {
        title: 'register'
    })
})

module.exports = router;
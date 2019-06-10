const express = require('express');
const router = express.Router();
const db = require('../database');


router.get('/', (req, res) => {
    res.render('adminlogin', {
        title: 'admin login panel'
    });
})

router.post('/', (req, res) => {
    let a = req.body.username;
    let b = req.body.password;
    if (a == '' || b == '') {
        res.render('adminlogin', {
            title: 'admin not found',
            msg: 'please fill-in all fields'
        })
    }
    let query = `SELECT * FROM admins WHERE userName="${a}" AND password="${b}"`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);

        } else if (result == '') {
            res.render('adminlogin', {
                title: 'admin not found',
                msg: 'unauthorized username!'
            })
        } else {
            console.log('user found...');
            res.render('dashboard', {
                title: 'Sarokaar | Dashboard',
                admin: result
            })
            console.log(result);
        }
    })
})

router.get('/getAllUsers', (req, res) => {
    let query = `SELECT * FROM users ORDER BY uid ASC`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log('users fetching...');
            res.render('getUsers', {
                users: result,
                title: 'get users'
            })
        }
    })
})

module.exports = router;
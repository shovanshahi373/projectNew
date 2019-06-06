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
                title: 'you are authorized admin'
            })
            console.log(result);
        }
    })
})

module.exports = router;
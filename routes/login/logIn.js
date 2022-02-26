const express = require('express');
const db = require('../../db');
const router = express.Router();

router.post('/', (req , res,next) => {
    let email = req.body.email
    let password = req.body.password;
    let query = db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.render('mainpage',{email:email})
        } else { res.send('Incorrect Email or Password!'); }
    })
})

module.exports=router;
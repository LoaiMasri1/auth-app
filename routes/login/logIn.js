const express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
const db = require('../../db');
const router = express.Router();

function getUsername(email){
    let sql="SELECT username FROM users WHERE email=?";
    db.query(sql,email, (err, result)=>{
        if(err) throw err;
        console.log(result[0].username);
        return result[0].username;
    });
}

router.post('/', (req , res,next) => {
    let email = req.body.email
    let password = req.body.password;
    let query = db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.render('mainpage',{email:email});
        } else { res.send('Incorrect Email or Password!'); }
    })
})

module.exports=router;
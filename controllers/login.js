const db = require('../config/db');
const bcrypt = require('bcrypt');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const login = (req, res, next) => {
    localStorage.setItem('VerEmail', req.body.email);
    let query =  db.query('SELECT * FROM users WHERE email = ? ', [req.body.email], async(error, results) => {
        console.log(results[0].Password);
        let isMatch=await bcrypt.compare(req.body.password,results[0].Password) ;
        console.log(isMatch);
        if (error) throw error;
         if(isMatch){
            if (results.length > 0) {
                let ver = results[0].verified;
                let sql = "SELECT username FROM users WHERE email=?";
                db.query(sql, req.body.email, (err, result) => {
                    if (err) throw err;
                    if (ver == 1) {
                        ver = null;
                    } else if (ver == 0) {
                        ver = "Not Verified";
                    }
                    res.render('mainpage', { username: result[0].username, verified: ver });
                });
            }
             else { res.send('Incorrect Email or Password!'); }
        }
        else {return res.send('Incorrect Email or Password!');}
})}

module.exports = login;
const db = require('../config/db');
const bcrypt = require('bcrypt');
const login = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password;
    let query =  db.query('SELECT * FROM users WHERE email = ? ', [email], async(error, results) => {
        console.log(results[0].Password);
        let isMatch=await bcrypt.compare(password,results[0].Password) ;
        console.log(isMatch);
        if (error) throw error;
         if(isMatch){
            if (results.length > 0) {
                let ver = results[0].verified;
                let sql = "SELECT username FROM users WHERE email=?";
                db.query(sql, email, (err, result) => {
                    if (err) throw err;
                    if (ver == 1) {
                        ver = "Verified";
                    } else if (ver == 0) {
                        ver = "Not Verified";
                    }
                    res.render('mainpage', { username: result[0].username, verified: ver });
                });
            }
             else { res.send('Incorrect Email or Password!'); }
        }
         
         else {return false};
        
})}


module.exports = login;
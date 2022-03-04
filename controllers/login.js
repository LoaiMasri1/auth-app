const db = require('../config/db');

const login = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password;

    let query = db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) throw error;
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
        } else { res.send('Incorrect Email or Password!'); }
    })
}

module.exports = login;
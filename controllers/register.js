const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const addUser = async (req, res, next) => {
    const salt = 10;
let hashPassword= await bcrypt.hash(req.body.password,salt);
    let post = { id: uuidv4(), username: req.body.name, email: req.body.email, password: hashPassword, age: req.body.age };
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, post, (err, results) => {
        if (err) {
            throw err;
        }
        res.redirect('/');
    })
}

const getUser = (req, res, next) => {
    let sql = 'SELECT * FROM users';
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        res.send('users fitched <3')
    })
}

module.exports={
    addUser:addUser,
    getUser:getUser
};
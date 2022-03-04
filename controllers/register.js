const express= require('express');
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const addUser = (req, res, next) => {
    let post = { id: uuidv4(), username: req.body.name, email: req.body.email, password: req.body.password, age: req.body.age };
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
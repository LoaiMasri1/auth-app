const db = require('../config/db');
require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt=require("bcrypt")

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const confirmCode = (req, res, next) => {
    let code = localStorage.getItem("code");

    if (req.body.number == parseInt(code)) {
        res.redirect('/newpassword');
        localStorage.removeItem("code");
    }
    else {
        res.send('invalid code :(');
    }
}

const forgetUser = (req, res, next) => {
    let sql = `select * from users where email= '${req.query.email}' `;
    localStorage.setItem("email", req.query.email);
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        if (results.length > 0) { //user found
            res.redirect('/SendCode');
        } else {
            res.send('user not found'); // user not found
        }
    });
}

const newPassword = async(req, res, next) => {
    let hashPassword= await bcrypt.hash(req.body.password,10)

    let sql = 'update users set Password = ? where Email = ? ';
    let query = db.query(sql, [hashPassword, localStorage.getItem("email")], (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
    });
    res.redirect('/');
    localStorage.removeItem("email");
}

const sendCode = (req, res, next) => {
    let rand = parseInt(Math.random() * 100000);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_USER,
            pass: process.env.GOOGLE_PASS
        }
    });

    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to: `${localStorage.getItem("email")}`,
        subject: 'Account Confirmation',
        html: '<center><h1>welcome</h1><h1>The confirmation code is</h1><h1 color="red">' + rand.toString() + '</h1></center>'
    };
    console.log(rand);
    
    transporter.sendMail(mailOptions,(err, info)=> {
        if (err) console.log(err);
         else {
            console.log('Done : ' + info.response);
            res.redirect('/ConfirmationCode');
            localStorage.setItem("code", rand);
        }
    })
}

module.exports = {
    confirmCode: confirmCode,
    forgetUser: forgetUser,
    newPassword: newPassword,
    sendCode: sendCode
};


const db = require("../config/db");
const nodemailer = require("nodemailer");
const sendCode=(req,res,next) => {
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
        to: `${localStorage.getItem("VerEmail")}`,
        subject: 'Email Verification',
        html: '<center><h1>welcome</h1><h1>The confirmation code is</h1><h1 color="red">' + rand.toString() + '</h1></center>'
    };
    console.log(rand);
    
    transporter.sendMail(mailOptions,(err, info)=> {
        if (err) console.log(err);
         else {
            console.log('Done : ' + info.response);
            res.redirect('/GetCode');
            localStorage.setItem("Vercode", rand);
        }
    })
}

const verifyEmail=(req,res,next) => {
    let code = localStorage.getItem("Vercode");
    if (code == req.body.number) {
        let sql = `update users set verified = 1 where email = '${localStorage.getItem("VerEmail")}'`;
        db.query(sql, (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results);
        });
        res.redirect('/');
        localStorage.removeItem("VerEmail");
    }
    else {
        res.send('invalid code :(');
    }
}

module.exports = {
    sendCode:sendCode,
    verifyEmail:verifyEmail
};

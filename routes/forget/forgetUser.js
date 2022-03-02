const express=require('express');
const db=require('../../db');
const router=express.Router();
const sendCode= require('./sendCode');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

router.get('/',(req,res)=>{
    let sql=`select * from users where email='${req.query.email}' `;
    localStorage.setItem("email", req.query.email);
    let query=db.query(sql,(err,results)=>{
        if(err){
            throw err;
        }
        console.log(results);
        if(results.length>0){ //user found
          res.redirect('/SendCode');
        }else{
            res.send('user not found'); // user not found
        }
    });
});

// router.post('/',(req,res)=>{

//     const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'muthanamuthana934@gmail.com',
//         pass: '0599356327'
//     }
//     }); 

//   let rand = parseInt(Math.random()*100000); 
//   const mailOptions = {
//     from: 'muthanamuthana934@gmail.com',
//     to: `${req.body.email}`,
//     subject: 'Account Confirmation',
//      html:'<center><h1>welcome</h1><h1>The confirmation code is</h1><h1 color="red">'+rand.toString()+'</h1></center>'
//   };
//   console.log(rand);    
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Done : ' + info.response);
//       res.redirect('/ConfirmationCode');
//       localStorage.setItem("code",rand);
//     }
    
//   });
// })

module.exports=router;
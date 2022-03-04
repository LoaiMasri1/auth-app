const express = require('express')
const app = express()
const router=express.Router();
const { get } = require('http');
const nodemailer = require('nodemailer');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

router.post('/',(req,res)=>{

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'muthanamuthana934@gmail.com',
        pass: '0599356327'
    }
    }); 

  let rand = parseInt(Math.random()*100000); 
  const mailOptions = {
    from: 'muthanamuthana934@gmail.com',
    to: `${localStorage.getItem("email")}`,
    subject: 'Account Confirmation',
     html:'<center><h1>welcome</h1><h1>The confirmation code is</h1><h1 color="red">'+rand.toString()+'</h1></center>'
  };
  console.log(rand);    
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Done : ' + info.response);
      res.redirect('/ConfirmationCode');
      localStorage.setItem("code",rand);
    }
    
  });
});

module.exports=router;
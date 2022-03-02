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
  let code =localStorage.getItem("code");

    if(req.body.number == parseInt(code)){
      res.redirect('/newpassword');
      localStorage.removeItem("code");
    }
    else{
      res.send('invalid code :(');
    }
});

module.exports=router;
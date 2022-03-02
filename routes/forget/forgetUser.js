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

module.exports=router;
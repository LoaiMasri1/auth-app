const express=require('express');
const db=require('../../db');
const router=express.Router();

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

router.post('/',(req,res)=>{
    let sql = 'update users set Password = ? where Email = ? ';
    let query=db.query(sql,[req.body.password,localStorage.getItem("email")],(err,results)=>{
        if(err){
            throw err;
        }
        console.log(results);
        });
        res.redirect('/');
        localStorage.removeItem("email");
});

module.exports=router;
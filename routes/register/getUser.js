const express=require('express');
const db=require('../../db');
const router=express.Router();
router.get('/' , (req , res,next) => {
    let sql ='SELECT * FROM users' ; 
    let query = db.query(sql,(err,results) => {
        if(err){
            throw err;
        }
        console.log(results);
        res.send('users fitched <3')
    });
});

module.exports=router;
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

const db = mysql.createConnection({
    host     :  process.env.HOST,
    user     :  process.env.USER,
    database :  process.env.DATABASE,
});

db.connect((err) => {
    if (err){
        throw err;
    }
    console.log("mysql connected <3 ");
} );

app.get('/getusers' , (req , res) => {
    let sql ='SELECT * FROM users' ; 
    let query = db.query(sql,(err,results) => {
        if(err){
            throw err;
        }
        console.log(results);
        res.send('users fitched <3')
    });
});

app.get('/forget',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','./forgetPassword/forget.html'));
})

app.get('/forget/user',(req,res)=>{

    let sql=`select * from users where email=${req.query.email} `;
    let query=db.query(sql,(err,results)=>{
        if(err){
            throw err;
        }
        console.log(results);
        if(results.length>0){ // user found
            res.redirect(`/newpassword/?email=${req.query.email}`);
        }else{
            res.send('user not found'); // user not found
        }

        });
    });

app.get('/newpassword',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','./forgetPassword/NewPassword.html'));
})


app.listen(process.env.PORT || 5000 , () => {
    console.log('Server started on port 3000');
});



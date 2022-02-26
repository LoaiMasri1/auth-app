const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
    }
const app = express();
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    res.render('./login/logIn')
});
app.get('/signup',(req,res)=>{
    res.render('./register/register')
});

app.get('/forget',(req,res)=>{
    res.render('./forget/forget_password')
});

app.get('/newpassword',(req,res)    => {
    res.render('./forget/insert_password');
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

app.post('/add', (req, res, next) => {
    let post = {id:uuidv4(), username: req.body.name, email: req.body.email, password: req.body.password, age: req.body.age };
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, post, (err, results) => {
        if (err) {
            throw err;
        }
    res.redirect('/');
    });
});

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



app.get('/forget/user',(req,res)=>{
    let sql=`select * from users where email='${req.query.email}' `;
    localStorage.setItem("email", req.query.email);
    let query=db.query(sql,(err,results)=>{
        if(err){
            throw err;
        }
        console.log(results);
        if(results.length>0){ // user found
            res.redirect(`/newpassword`);

        }else{
            res.send('user not found'); // user not found
        }
    });
});

app.post('/newpassword',(req,res)=>{
    
    let sql = `update users set Password = '${req.body.password}' where Email = '${localStorage.getItem("email")}'`;
    let query=db.query(sql,(err,results)=>{
        if(err){
            throw err;
        }
        console.log(results);
        });
        res.redirect(`/`);
        localStorage.removeItem("email");
});

app.post('/login', (req , res) => {
    let email = req.body.email
    let password = req.body.password;
    let query = db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.render('mainpage',{email:req.body.email})
        } else { res.send('Incorrect Email or Password!'); }
    })
})

app.listen(process.env.PORT || 5000 , () => {
    console.log('Server started on port 3000');
});


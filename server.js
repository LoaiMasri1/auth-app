const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const e = require('express');
require('dotenv').config();

const app = express();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.post('/formPost',(req,res)=>{
    console.log(req.body);
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const db = mysql.createConnection({
    host     :  process.env.HOST,
    user     :  process.env.USER,
    database : process.env.DATABASE,
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

app.get('/getusers/:id' , (req , res) => {
    let sql =`SELECT Username FROM Users WHERE Id = ${req.params.id}` ; 
    let query = db.query(sql,(err,results) => {
        if(err){
            throw err;
        }
        console.log(results);
        res.send('users fitched <3')
    });
});
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

app.listen(process.env.PORT || 5000 , () => {
    console.log('Server started on port 3000');
});



const express = require('express');
const app = express();
const mysql = require('mysql');


app.get('/', (req, res) => {
    res.send('Hello World!');
});

const db = mysql.createConnection({
    host     :  'localhost',
    user     :  'root' ,
    password : '' ,
    database : 'register'   
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
app.post('/add', (req,res,next) => {
   let post = {Id:req.body.id,Username:req.body.username ,Email: req.body.email , Password: req.body.password, Age: req.body.age};
   let sql = 'INSERT INTO users SET ?';
   let query = db.query(sql,post,(err, results) => {
    if(err){
        throw err;
    }
    console.log(results);
    res.send('post created <3')

   });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});



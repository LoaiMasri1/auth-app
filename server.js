const express = require('express');
const addUser = require('./routes/register/addUser');
const getUser = require('./routes/register/getUser');
const loginUser = require('./routes/login/logIn');
const forgetUser = require('./routes/forget/forgetUser');
const newPassword = require('./routes/forget/newPassword');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

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

app.use('/add',addUser);
app.use('/getusers',getUser);
app.use('/login',loginUser);
app.use('/forget/user',forgetUser);
app.use('/newpassword',newPassword);

const PORT=process.env.PORT
app.listen(PORT || 5000 , () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});
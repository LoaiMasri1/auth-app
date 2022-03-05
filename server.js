const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const loginUser = require('./routes/logIn');
const forget = require('./routes/forget');
const register=require('./routes/register');


require('dotenv').config();
require('./config/passport')(passport);

const app = express();
// to use the session
app.use(session({secret: 'secret', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());
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

app.get('/ConfirmationCode',(req,res)    => {
  res.render('./forget/Confirmation_code');
});

app.get('/SendCode',(req,res)    => {
  res.render('./forget/send_code');
});

app.get("/home/google", (req, res) => {
  //console.log(req.user);
  res.render("mainpage", { username: req.user.displayName,verified:true });
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/login/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/home/google"); //redirect to home page
  }
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
const db = require('./config/db');
app.get('/verified', (req, res)=>{
  let sql = 'update users set verified = ? where Email = ? ';
  let query = db.query(sql, [1, "hamood_hmouda@outlook.sa"], (err, results) => {
    if (err) {
      throw err;
    }
  });
});
// app.use('/add',addUser);
// app.use('/getusers',getUser);
app.use('/login',loginUser);

app.use('/forget/user',forget);
app.use('/register',register);

const PORT=process.env.PORT
app.listen(PORT || 5000 , () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
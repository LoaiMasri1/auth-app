const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require("path");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
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
app.use("/static", express.static('./public/'));


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

app.use('/',require('./routes/pages'));
app.use('/login',require('./routes/logIn'));
app.use('/forget/user',require('./routes/forget'));
app.use('/register',require('./routes/register'));

const PORT=process.env.PORT
app.listen(PORT || 5000 , () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
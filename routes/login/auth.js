require('dotenv').config();
const GoogleStrategy=require('passport-google-oauth20').Strategy;

const CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET=process.env.GOOGLE_SECRET;

const initialize = passport => {
  passport.use(
    new GoogleStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }));
      
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};

module.exports = initialize;


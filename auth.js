var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
db = require('./db')();

passport.use(new BasicStrategy(
   function(username, password, done) {

       var user = db.findOne(username);

       if (!user) {
           return done(null, false);
       } else {
           if (password == user.password) {
               return done(null, user);
           }
           else {
               return done(null, false);
           }
       }
   }));

exports.isAuthenticated = passport.authenticate('basic', { session: false });

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db');
var User = db.User;
require('mongoose');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, function(){alert('Unable to find username')});
      }
      if (user.password!==password) {
        return done(null, false, function(){alert("Wrong password")});
      }
      return done(null, user);
    });
  }
));

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
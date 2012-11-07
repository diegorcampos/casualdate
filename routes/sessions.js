module.exports = function(Casualist) {
  var LocalStrategy = require('passport-local').Strategy;
  var passport = require('passport');

  passport.use(new LocalStrategy({
    usernameField: 'nickname',
    passwordField: 'password'
  },
  function(nickname, password, done) {
    Casualist.Models.User.find({where: {nickname: nickname, password: password}}).success(function(user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Error authenticating.' });
      }
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  passport.deserializeUser(function(id, done) {
    Casualist.Models.User.find(id).success(function(user) {
      return done(null, user);
    });
  });

  return {
    create: function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
          return res.send({user: user});
        }
        req.logIn(user, function(err) {
          return res.send({user: user});
        });
      })(req, res, next);
    },
    destroy: function(req, res) {
      req.logOut();
      res.redirect('/');
    }
  }
}


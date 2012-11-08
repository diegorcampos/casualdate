module.exports = function(Casualist) {
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy({
    usernameField: 'nickname',
    passwordField: 'password'
  },
  function(nickname, password, done) {
    Casualist.Models.User.find({where: ["nickname like ? and password = ?", nickname, password]}).success(function(user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Error authenticating.' });
      }
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    Casualist.Models.User.find(id).success(function(user) {
      return done(null, user);
    });
  });

  return {
    check: function(req, res, next) {
      if (req.isAuthenticated()) {
        return res.send({auth: true, user: req.user});
      } else {
        return res.send({auth: false, user: false});
      }
    },
    create: function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
          return res.send({auth: false, user: user});
        }
        req.logIn(user, function(err) {
          return res.send({auth: true, user: user});
        });
      })(req, res, next);
    },
    destroy: function(req, res) {
      req.logOut();
      return res.send({auth: false, user: false});
    }
  }
}


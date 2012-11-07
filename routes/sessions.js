var passport = require('passport');
exports.create = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      return res.send({user: user});
    }
    req.logIn(user, function(err) {
      return res.send({user: user});
    });
  })(req, res, next);
};
exports.destroy = function(req, res){
  req.logOut();
  res.redirect('/');
};


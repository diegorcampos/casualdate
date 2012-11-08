module.exports = function(Casualist) {
  return {
    show: function(req, res, next) {
      var id = parseInt(req.params.id);
      Casualist.Models.User.find(id).success(function(user) {
        return res.send({user: user});
      });
    },
    update: function(req, res, next) {
      var id = parseInt(req.params.id);
      Casualist.Models.User.find(id).success(function(user) {
        user.updateAttributes(req.body).success(function(user) {
          return res.send({user: user});
        });
      });
    }
  }
}


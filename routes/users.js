module.exports = function(Casualist) {
  return {
    index: function(req, res, next) {
      Casualist.Models.User.findAll().success(function(users) {
        var chainer = new Casualist.Sequelize.Utils.QueryChainer;
        var _users  = [];

        users.forEach(function(u) {
          var emitter = new Casualist.Sequelize.Utils.CustomEventEmitter(function() {
            u.getImages().on('success', function(images) {
              var user_values = u.values;
              user_values.images = images;
              _users.push(user_values);
              emitter.emit('success')
            });
          });
          chainer.add(emitter.run())
        });
        chainer.run().on('success', function() {
          console.log(_users[0].images);
          res.send(_users);
        });
      })
    },
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
    },
    images: require('./users/images')(Casualist)
  }
}


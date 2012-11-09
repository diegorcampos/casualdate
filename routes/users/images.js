module.exports = function(Casualist) {
  return {
    index: function(req, res, next) {
      var user_id = parseInt(req.params.id);

      Casualist.Models.User.find(user_id).complete(function(err, user) {
        user.getImages().complete(function(err, images) {
          return res.send(images);
        });
      });
    }
  }
}


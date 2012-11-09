module.exports = function(Casualist) {
  return {
    index: function(req, res, next) {
      Casualist.Models.Post.findAll().done(function(err, models) {
        return res.send(models);
      });
    }
  }
}


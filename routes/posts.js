module.exports = function(Casualist) {
  return {
    index: function(req, res, next) {
      Casualist.Models.Post.findAll().done(function(err, models) {
        return res.send(models);
      });
    },
    update: function(req, res, next) {
      var id = parseInt(req.params.id);
      Casualist.Models.Post.find(id).success(function(model) {
        model.updateAttributes(req.body).success(function(model) {
          return res.send({post: model});
        });
      });
    },
  }
}


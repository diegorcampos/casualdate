module.exports = function(Casualist) {
  return {
    create: function(req, res, next) {
      var user_id = req.body.user_id;
      var data = req.body.data;
      Casualist.Models.Image.upload(user_id, data, function(err, model) {
        return res.send({err: err, image: model});
      });
    },
    index: function(req, res, next) {
      Casualist.Models.Image.findAll().done(function(err, models) {
        return res.send(models);
      });
    },
    destroy: function(req, res, next) {
      console.log("DESTROY");
      var id = parseInt(req.params.id);
      Casualist.Models.Image.destroyClean(id, function(err, data) {
        return res.send({err: err, data: data});
      });
    }
  }
}


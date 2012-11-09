module.exports = function(Casualist) {
  return {
    root: function(req, res){
      res.render('index');
    },
    images: require('./routes/images')(Casualist),
    posts: require('./routes/posts')(Casualist),
    sessions: require('./routes/sessions')(Casualist),
    users: require('./routes/users')(Casualist)
  }
}


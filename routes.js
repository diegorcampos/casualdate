module.exports = function(Casualist) {
  return {
    root: function(req, res){
      res.render('index');
    },
    sessions: require('./routes/sessions')(Casualist),
    users: require('./routes/users')
  }
}


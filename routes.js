exports.root = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.sessions = require('./routes/sessions');
exports.users = require('./routes/users');


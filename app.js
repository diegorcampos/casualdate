var express = require('express');
var routes = require('./routes');
var http = require('http');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var path = require('path');
var Sequelize = require('sequelize');
var store = new express.session.MemoryStore;

var sequelize = new Sequelize('casualist', 'casualist', 'teap0tting', {
  dialect: 'sqlite',
  storage: 'database.sqlite'
})
var User = require('./models/user').User(sequelize);

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({email: username, password: password}).exec(function(err, user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Error authenticating.' });
      }
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id).populate("bookmarked_rooms").exec(function(err, user) {
    return done(null, user);
  });
});

var app = express();
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('teap0tting'));
  app.use(express.session({
    secret: "4achEgupafumagefreh84u5r7tru5eya",
    key: "casualist",
    store: store
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.root);
app.get('/users', routes.users.list);
app.post('/sessions', routes.sessions.create);
app.delete('/sessions', routes.sessions.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


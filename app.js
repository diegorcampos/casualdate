var express = require('express');
var http = require('http');
var passport = require('passport');
var path = require('path');
var Sequelize = require('sequelize');
var nStore = require('nstore');
var MongoStore = require('connect-mongo')(express);

var sequelize = new Sequelize('casualist', 'casualist', 'teap0tting', {
  dialect: 'sqlite',
  storage: 'database.sqlite'
})

var Casualist = {};
Casualist.Models = {};
Casualist.Models.Image = require('./models/image').Image(sequelize);
Casualist.Models.User = require('./models/user').User(sequelize);

var app = express();
Casualist.app = app;
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({
    secret: "4achEgupafumagefreh84u5r7tru5eya",
    store: new MongoStore({
      db: "casualist",
      auto_reconnect: true
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var routes = require('./routes')(Casualist);

app.get('/', routes.root);
app.post('/images', routes.images.create);
app.get('/users/:id', routes.users.show);
app.put('/users/:id', routes.users.update);
app.get('/sessions', routes.sessions.check);
app.post('/sessions', routes.sessions.create);
app.delete('/sessions', routes.sessions.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port') + " in " + app.get('env') + " mode");
});


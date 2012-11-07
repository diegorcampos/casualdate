define([
       'jquery',
       'underscore',
       'backbone',
       'bus',
       'models/session'
], function($, _, Backbone, Bus, Session) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '/login': 'login',
      '/activity': 'activity',
      '/explore': 'explore',
      '/profile': 'profile',

      // Default
      '*actions': 'login'
    },
    login: function () {
      Bus.trigger('setTitle', "Login");
      var that = this;
      require(['views/login'], function (loginView) {
        if (!Session.checkAuth()) {
          loginView.render();
        } else {
          window.location = '#';
        }
      });
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  Bus.on("setTitle", function (title) {
    $("title").html("EphoxC3 - " + title);
  });
  return {
    initialize: initialize
  };
});


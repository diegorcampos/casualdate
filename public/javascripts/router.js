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
      console.log("LOGIN");
      Bus.trigger('setTitle', "Login");
      var that = this;
      require(['views/login'], function (loginView) {
        if (!Session.checkAuth()) {
          loginView.render();
        } else {
          window.location = '#';
        }
      });
    },
    activity: function() {
      console.log("ACTIVITY");
      require(['views/activity'], function (activityView) {
        activityView.render();
      });
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.router = app_router;
    console.log("History start: " + Backbone.history.start());
  };
  Bus.on("setTitle", function (title) {
    $("title").html("Casualist - " + title);
  });
  return {
    initialize: initialize
  };
});


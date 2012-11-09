define([
       'jquery',
       'underscore',
       'backbone',
       'bus',
       'models/session'
], function($, _, Backbone, Bus, Session) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      'login': 'login',
      'logout': 'logout',

      'news': 'news',
      'explore': 'explore',
      'profile': 'profile',

      // Default
      '*default': 'default'
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
    logout: function() {
      var that = this;
      $('.main').fadeOut(200, function() {
        Session.logout(function() {
          window.location = '#';
        });
      });
    },
    news: function() {
      Bus.trigger('setTitle', "News");
      require(['views/news'], function (newsView) {
        newsView.render();
      });
    },
    explore: function() {
      Bus.trigger('setTitle', "Explore");
      require(['views/explore'], function (exploreView) {
        exploreView.render();
      });
    },
    profile: function() {
      Bus.trigger('setTitle', "Profile");
      require(['views/profile'], function (profileView) {
        profileView.render();
      });
    },
    default: function() {
      console.log("DEFAULT");
      if (Session.checkAuth()) {
        this.news();
      } else {
        this.login();
      }
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.router = app_router;
    Backbone.history.start();
  };
  Bus.on("setTitle", function (title) {
    $("title").html("Casualist - " + title);
  });
  return {
    initialize: initialize
  };
});


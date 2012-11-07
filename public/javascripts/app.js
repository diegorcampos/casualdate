define([
       'jquery',
       'underscore',
       'backbone',
       'bus',
       'models/session',
       'router',
       'views/main'
], function($, _, Backbone, Bus, Session, Router, mainView) {
  var initialize = function() {
    Session.initialize({
      setUp: function(model) {
        Bus.trigger('validSessionAuth');
      },
      tearDown: function() {
        Bus.trigger('invalidSessionAuth');
      }
    });

    Router.initialize();
  }

  return {
    initialize: initialize
  };
});


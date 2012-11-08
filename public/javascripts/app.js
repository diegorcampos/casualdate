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
        console.log('validSessionAuth');
        Bus.trigger('validSessionAuth');
      },
      tearDown: function() {
        console.log('invalidSessionAuth');
        Bus.trigger('invalidSessionAuth');
      }
    });
    Session.check(function () {
      Router.initialize();
    });
  }

  return {
    initialize: initialize
  };
});


define([
  'jquery',
  'underscore',
  'backbone',
  'bus',
  'models/session',
  'text!templates/main.html',
], function ($, _, Backbone, Bus, Session, mainTemplate) {
  var mainView = Backbone.View.extend({
    el: $('body'),
    render: function () {
      this.$el.html(_.template(mainTemplate));
      require(['views/activity'], function(activityView) {
        activityView.render();
      });
    },
    initialize: function() {
      console.log("MAIN VIEW INITIALIZED");
      Bus.on('validSessionAuth', this.render, this);
    }
  });
  return new mainView;
});


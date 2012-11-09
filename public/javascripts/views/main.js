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
      require(['views/news'], function(newsView) {
        newsView.render();
      });
    },
    initialize: function() {
      Bus.on('validSessionAuth', this.render, this);
    }
  });
  return new mainView;
});


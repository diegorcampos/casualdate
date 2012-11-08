define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/activity.html',
], function ($, _, Backbone, Session, activityTemplate) {
  var activityView = Backbone.View.extend({
    el: $('.content'),
    render: function () {
      this.$el.html(_.template(activityTemplate));
      $('.navigation li').removeClass("active");
      $('.navigation li.activity').addClass("active");
    },
  });
  return new activityView;
});


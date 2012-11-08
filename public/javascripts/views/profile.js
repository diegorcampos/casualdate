define([
  'jquery',
  'underscore',
  'backbone',
  'bus',
  'models/session',
  'text!templates/profile.html',
], function ($, _, Backbone, Bus, Session, profileTemplate) {
  var profileView = Backbone.View.extend({
    el: $('.content'),
    render: function () {
      this.$el.html(_.template(profileTemplate));
    },
  });
  return new profileView;
});


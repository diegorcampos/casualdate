define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'collections/users',
  'text!templates/explore.html',
  'text!templates/explore/user.html'
], function ($, _, Backbone, Session, UsersCollection, exploreTemplate, exploreUserTemplate) {
  var exploreView = Backbone.View.extend({
    el: $('.content'),
    render: function () {
      this.$el.html(_.template(exploreTemplate));
      $('.navigation li').removeClass("active");
      $('.navigation li.explore').addClass("active");

      this.collection = new UsersCollection();
      this.collection.fetch({
        success: function (collection) {
          collection.each(function(item) {
            $('.explore-images').append(_.template(exploreUserTemplate, {model: item}));
          }, this);
        }
      });
    },
  });
  return new exploreView;
});


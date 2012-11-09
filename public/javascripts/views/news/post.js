define([
  'jquery',
  'underscore',
  'backbone',
  'bus',
  'models/post',
  'text!templates/news/post.html',
], function ($, _, Backbone, Bus, PostModel, newsPostTemplate) {
  var view = Backbone.View.extend({
    events: {},
    render: function () {
      this.$el.html(_.template(newsPostTemplate, {model: this.model}));
      return this;
    }
  });
  return view;
});


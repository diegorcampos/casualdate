define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var model = Backbone.Model.extend({
    urlRoot: '/posts',
    defaults: {
      'title': 'Post title',
      'text': 'Post text'
    }
  });
  return model;
});


define([
  'jquery',
  'underscore',
  'backbone',
  'models/post'
], function ($, _, Backbone, PostModel) {
  var collection = Backbone.Collection.extend({
    url: '/posts',
    model: PostModel
  });
  return collection;
});


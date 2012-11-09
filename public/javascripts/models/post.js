define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var model = Backbone.Model.extend({
    urlRoot: '/posts'
  });
  return model;
});


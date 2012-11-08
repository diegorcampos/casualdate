define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var ImageModel = Backbone.Model.extend({
    urlRoot: '/images'
  });
  return ImageModel;
});


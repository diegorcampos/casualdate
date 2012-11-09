define([
  'jquery',
  'underscore',
  'backbone',
  'models/image'
], function ($, _, Backbone, ImageModel) {
  var ImagesCollection = Backbone.Collection.extend({
    url: '/images',
    model: ImageModel
  });
  return ImagesCollection;
});


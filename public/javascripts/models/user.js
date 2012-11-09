define([
  'jquery',
  'underscore',
  'backbone',
  'collections/images'
], function ($, _, Backbone, ImagesCollection) {
  var UserModel = Backbone.Model.extend({
    urlRoot: '/users',
    initialize: function() {
      this.images = new ImagesCollection;
      this.images.url = '/users/' + this.id + '/images';
    }
  });
  return UserModel;
});


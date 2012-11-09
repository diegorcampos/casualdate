define([
  'jquery',
  'underscore',
  'backbone',
  'models/user'
], function ($, _, Backbone, UserModel) {
  var collection = Backbone.Collection.extend({
    url: '/users',
    model: UserModel
  });
  return collection;
});


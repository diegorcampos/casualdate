define([
       'backbone',
       'underscore'
], function (Backbone, _) {
  var bus = _.clone(Backbone.Events);
  return bus;
});


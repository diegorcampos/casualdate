define([
  'jquery',
  'underscore',
  'backbone',
  'bus',
  'models/image',
  'text!templates/profile/image.html',
], function ($, _, Backbone, Bus, ImageModel, profileImageTemplate) {
  var view = Backbone.View.extend({
    events: {
      'click span.delete': 'delete'
    },
    render: function () {
      this.$el.html(_.template(profileImageTemplate, {image: this.model}));
      return this;
    },
    delete: function() {
      this.$el.remove();
      this.model.destroy({
        success: function () {}
      });
      return false;
    }
  });
  return view;
});



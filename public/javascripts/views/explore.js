define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'collections/images',
  'text!templates/explore.html',
  'text!templates/explore/image.html'
], function ($, _, Backbone, Session, ImagesCollection, exploreTemplate, exploreImageTemplate) {
  var exploreView = Backbone.View.extend({
    el: $('.content'),
    render: function () {
      this.$el.html(_.template(exploreTemplate));
      $('.navigation li').removeClass("active");
      $('.navigation li.explore').addClass("active");

      this.collection = new ImagesCollection();
      this.collection.fetch({
        success: function (collection) {
          collection.each(function(item) {
            $('.explore-images').append(_.template(exploreImageTemplate, {image: item}));
          }, this);
        }
      });
    },
  });
  return new exploreView;
});


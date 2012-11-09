define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'collections/posts',
  'views/news/post',
  'text!templates/news.html',
], function ($, _, Backbone, Session, PostsCollection, PostView, newsTemplate) {
  var newsView = Backbone.View.extend({
    el: $('.content'),
    render: function () {
      this.$el.html(_.template(newsTemplate));
      $('.navigation li').removeClass("active");
      $('.navigation li.news').addClass("active");

      console.log("PING");
      this.collection = new PostsCollection;
      this.collection.fetch({
        success: function(collection) {
          $('.posts-list').empty();
          collection.each(function(item) {
            var postView = new PostView({model: item});
            $('.posts-list').append(postView.render().el);
          });
        }
      });
    },
  });
  return new newsView;
});


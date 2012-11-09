define([
  'jquery',
  'underscore',
  'backbone',
  'bus',
  'etch',
  'models/post',
  'text!templates/news/post.html',
], function ($, _, Backbone, Bus, etch, PostModel, newsPostTemplate) {
  var view = Backbone.View.extend({
    events: {
      'mousedown .editable': 'editableClick'
    },
    editableClick: etch.editableInit,
    initialize: function() {
      _.bindAll(this, 'save');
      this.model.bind('save', this.save);
    },
    render: function () {
      this.$el.html(_.template(newsPostTemplate, {model: this.model}));
      return this;
    },
    save: function() {
      this.model.set('title', this.$el.find('.post-title').html());
      this.model.set('text', this.$el.find('.post-text').html());
      console.log(this.model.title);
      console.log(this.model.text);
      this.model.save({}, {
        success: function() {
          alert("Saved");
        }
      });
    }
  });
  return view;
});


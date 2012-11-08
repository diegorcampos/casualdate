define([
  'jquery',
  'underscore',
  'backbone',
  'bus',
  'models/session',
  'models/user',
  'text!templates/profile.html',
  'text!templates/profile/user.html',
  'jquery_serialize'
], function ($, _, Backbone, Bus, Session, UserModel, profileTemplate, profileUserTemplate) {
  var profileView = Backbone.View.extend({
    el: $('.content'),
    events: {
      'submit .profile-form': 'updateUser',
    },
    initialize: function() {
      this.user = new UserModel({id: Session.get('user').id});
    },
    render: function () {
      var that = this;

      this.$el.html(_.template(profileTemplate));
      $('.navigation li').removeClass("active");
      $('.navigation li.profile').addClass("active");

      this.user.fetch({
        success: function (model) {
          var user = model.get("user");
          $('.user-form').html(_.template(profileUserTemplate, {user: user}));
        }
      });
    },
    updateUser: function(e) {
      var json = $('form.profile-form').serializeObject();
      this.user.save(json, {
        success: function (model) {
          if (model.get("errors")) {
            $(".form-errors").html(model.get("errors").join("<br/>"));
            model.unset("errors");
            alert("Error");
          } else {
            alert("Saved");
          }
        }
      });
      return false;
    }
  });
  return new profileView;
});


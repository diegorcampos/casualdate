define([
       'jquery',
       'underscore',
       'backbone',
       'bus',
       'models/session',
       'models/user',
       'models/image',
       'text!templates/profile.html',
       'text!templates/profile/user.html',
       'jquery_serialize'
], function ($, _, Backbone, Bus, Session, UserModel, ImageModel, profileTemplate, profileUserTemplate) {
  var profileView = Backbone.View.extend({
    el: $('.content'),
    events: {
      'submit .profile-form': 'updateUser',
      'dragover .image-upload': 'imageUpload',
      'drop .image-upload': 'imageUpload',
      'click .image-upload-post': 'imageUploadPost'
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
    },
    imageUpload: function (event) {
      var that = this;
      event.stopPropagation();
      event.preventDefault();
      var e = event.originalEvent;
      e.dataTransfer.dropEffect = 'copy';
      this.pictureFile = e.dataTransfer.files[0];

      var readerData = new FileReader();
      readerData.onloadend = function () {
        $('.image-upload').attr('src', readerData.result);
        that.imageData = readerData.result;
      };
      readerData.readAsDataURL(this.pictureFile);
      return false;
    },
    imageUploadPost: function() {
      var user_id = this.user.id;
      var image = new ImageModel({user_id: user_id, data: this.imageData});
      image.save({}, {
        success: function (model, response, options) {
          console.log("Success saving image");
        },
        error: function (model, xhr, options) {
          console.log("Error saving image");
        }
      });
    }
  });

  return new profileView;
});


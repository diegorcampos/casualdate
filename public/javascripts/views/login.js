define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/login.html',
  'text!templates/login_errors.html',
  'jquery_serialize'
], function ($, _, Backbone, Session, loginTemplate, loginErrorsTemplate) {
  var loginView = Backbone.View.extend({
    el: $('body'),
    render: function () {
      this.$el.html(_.template(loginTemplate));
    },
    events: {
      'submit .login-form': 'login'
    },
    login: function() {
      var that = this;
      var creds = $('.login-form').serializeObject();
      console.log(creds);
      Session.login(creds, function (data) {
        if (data.user) {
          $('.login-form').fadeOut(200, function () {
            Backbone.router.navigate('#/activity', {trigger: true});
          });
        } else {
          $('.login-errors', that.el).hide().html(_.template(loginErrorsTemplate, {message: 'The email/password wasn\'t recognized'})).slideDown(200);
        }
      });
      return false;
    }
  });
  return new loginView;
});


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
      'click .login-heart': 'showLogin',
      'submit .login-form': 'login'
    },
    showLogin: function() {
      $('.login-heart').fadeOut(200, function () {
        $('.login-container').fadeIn(200);
      });
    },
    login: function() {
      var that = this;
      var creds = $('.login-form').serializeObject();
      Session.login(creds, function (data) {
        if (!data.user) {
          $('.login-errors', that.el).hide().html(_.template(loginErrorsTemplate, {message: 'Incorrect username/password.'})).slideDown(200);
        }
      });
      return false;
    }
  });
  return new loginView;
});


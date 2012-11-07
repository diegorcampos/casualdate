define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/login.html',
], function ($, _, Backbone, Session, loginTemplate) {
  var loginView = Backbone.View.extend({
    el: $('body'),
    render: function () {
      this.$el.html(_.template(loginTemplate));
    },
    events: {
      'submit .loginForm': 'login'
    },
    login: function() {
      var creds = $('.loginForm', $('.login-container')).serializeObject();
      Session.login(creds, function (data) {
        if (data.auth) {
          $('.welcome.panel').fadeOut(200, function () { // TODO
            if (data.user.last_site_id === null) {
              Backbone.router.navigate('#/settings/profile', true);
            } else {
              Backbone.router.navigate('#/site/' + data.user.last_site_id + '/sites', true);
            }

          });
        } else {
          $('.login-errors', that.el).hide().html(_.template(errorStripTemplate, {message: 'The email/password wasn\'t recognized'})).slideDown(200);
          //$('.login-errors', $('.loginForm')).hide().html(data.errors[0]).fadeIn(200);
          $('#logintest').text('Login');
        }
      });
    }
  });
  return new loginView;
});


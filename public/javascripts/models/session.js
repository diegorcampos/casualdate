define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var SessionModel = Backbone.Model.extend({
    url: '/sessions',
    defaults: {
      setUp: function () {
      },
      tearDown: function () {
      }
    },
    initialize: function (options) {
      this.set({auth: false});
      var model = this;
      var auth = this.get('auth');
      options = _.extend({}, this.defaults, options);
      $.ajaxPrefilter(function (ajaxOptions) {
        var success = ajaxOptions.success;
        ajaxOptions.dataType = 'json';

        ajaxOptions.success = function (data) {
          if (typeof data.auth !== 'undefined') {
            if (data.auth === false) {
              options.tearDown();
              model.set({auth: false});
              model.id = null;
              model.clear();
              $.ajaxSetup({});

            } else if (data.auth === true && auth === false) {
              model.set(data);
              options.setUp(model);

            }
          }

          if (success) {
            success(data);
          }
        };
      });
    },
    login: function (credentials, callback) {
      this.save(credentials, {
        success: function (model, res) {
          callback(res);
        }
      });
    },
    logout: function (callback) {
      this.id = 1;  // All Backbone models need an Id TODO
      this.destroy({
        success: function (model, res) {
          model.clear();
          model.id = null;
          callback(res);
        }
      });
    },
    check: function (callback) {
      this.fetch({
        success: function (model, res) {
          callback(res);
        }
      });
    },
    checkAuth: function () {
      return this.get('auth');
    }
  });
  return new SessionModel();
});


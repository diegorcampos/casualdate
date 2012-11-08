define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var SessionModel = Backbone.Model.extend({
    url: '/sessions',
    defaults: {
      setUp: function () {},
      tearDown: function () {}
    },
    initialize: function (options) {
      var model = this;
      model.set({user: false});
      options = _.extend({}, this.defaults, options);
      $.ajaxPrefilter(function (ajaxOptions) {
        var success = ajaxOptions.success;
        ajaxOptions.dataType = 'json';

        ajaxOptions.success = function (data) {
          if (typeof data.user !== 'undefined') {
            if (data.user !== false) {
              model.set(data);
              options.setUp(model);
            } else {
              options.tearDown();
              model.set({user: false});
              model.id = null;
              model.clear();
              $.ajaxSetup({});
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
      return this.get('user');
    }
  });
  return new SessionModel();
});


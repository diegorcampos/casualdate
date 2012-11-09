require.config({
  shim: {
    'etch': {
      exports: 'etch'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'jquery_serialize': {
      deps: ['jquery']
    }
  },
  paths: {
    etch: 'libs/etch/etch',
    jquery: 'libs/jquery/jquery-min',
    jquery_highlight: 'libs/jquery/jquery-highlight',
    jquery_serialize: 'libs/jquery/jquery-serialize',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    text: 'libs/require/plugins/text',
    templates: '../templates'
  }
});

require([
        'app'
], function(App) {
  App.initialize();
});


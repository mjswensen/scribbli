require.config({
  baseUrl: 'js/src/',
  paths: {
    jquery: '../lib/jquery-2.0.3.min',
    underscore: '../lib/amdjs-underscore-min',
    backbone: '../lib/amdjs-backbone-min'
  }
});

require(['views/App'], function(App) {
  new App();
});

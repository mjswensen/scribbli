require.config({
  baseUrl: 'js/src/',
  paths: {
    jquery: '../lib/jquery-2.0.3.min',
    underscore: '../lib/amdjs-underscore-min',
    backbone: '../lib/amdjs-backbone-min',
    moment: '../lib/moment-2.4.0.min'
  }
});

require(['views/App'], function(App) {
  new App();
});

define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var fonts = [
    'hand',
    'mono',
    'sans',
    'serif'
  ];

  return {

    getDefault: function() {
      return fonts[0];
    },

    getNext: function(font) {
      var idx = _.indexOf(fonts, font);
      switch(idx) {
        case fonts.length-1:
          return fonts[0];
          break;
        default:
          return fonts[idx+1];
          break;
      }
    },

    getAll: function() {
      return fonts.join(' ');
    }

  };

});

define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'utils/fonts'
], function($, _, Backbone, CONFIG, Fonts) {

  var Editable = Backbone.Model.extend({

    defaults: {
      rotation: 0,
      fontSize: 1,
      content: '',
      font: Fonts.getDefault(),
      bold: false,
      italic: false
    },

    updateSize: function(x, y) {
      this.set({
        width: Math.max(CONFIG.editableMinWidth, x - this.get('x')),
        height: Math.max(CONFIG.editableMinHeight, y - this.get('y'))
      });
    }

  });

  return Editable;

});

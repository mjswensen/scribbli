define([
  'jquery',
  'underscore',
  'backbone',
  'config'
], function($, _, Backbone, CONFIG) {

  var Editable = Backbone.Model.extend({

    initialize: function() {
      this.set({
        rotation: 0,
        fontSize: 1
      });
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

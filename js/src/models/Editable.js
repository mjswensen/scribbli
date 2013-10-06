define([
  'jquery',
  'underscore',
  'backbone',
  'config'
], function($, _, Backbone, CONFIG) {

  var Editable = Backbone.Model.extend({

    updateSize: function(x, y) {
      this.set({
        width: Math.max(CONFIG.editableMinWidth, x - this.get('x')),
        height: Math.max(CONFIG.editableMinHeight, y - this.get('y'))
      });
    }

  });

  return Editable;

});

define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var Editable = Backbone.View.extend({

    tagName: 'div',
    className: 'editable creating',
    attributes: {'contenteditable': true},

    initialize: function() {
      this.listenTo(this.model, "change", this.setCss);
    },

    render: function(parent) {
      if(this.setCss()) {
        parent.append(this.$el);
      }
    },

    setCss: function() {
      if(!this.model) return false;
      this.$el.css({
        top: this.model.get('y'),
        left: this.model.get('x'),
        width: this.model.get('width'),
        height: this.model.get('height')
      });
      return true;
    },

    events: {
      'mousedown': 'select',
      'mouseup': 'select'
    },

    select: function(e) {
      e.stopPropagation();
    }

  });

  return Editable;

});

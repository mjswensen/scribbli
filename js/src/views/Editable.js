define([
  'jquery',
  'underscore',
  'backbone',
  'config'
], function($, _, Backbone, CONFIG) {

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
      'mousedown': 'mousedownHandler',
      'mousemove': 'mousemoveHandler',
      'mouseup': 'mouseupHandler'
    },

    getX: function(e) {
      return e.pageX - this.$el.offset().left;
    },

    getY: function(e) {
      return e.pageY - this.$el.offset().top;
    },

    isResizeHit: function(e) {
      return this.$el.width() - this.getX(e) <= CONFIG.resizeHandleSize && this.$el.height() - this.getY(e) <= CONFIG.resizeHandleSize;
    },

    mousedownHandler: function(e) {
      e.stopPropagation();
      if(this.isResizeHit(e)) {
        this.resizing = true;
        this.resizeOffsetX = this.$el.width() - this.getX(e);
        this.resizeOffsetY = this.$el.height() - this.getY(e);
      } else {
        this.moving = true;
        this.moveOffsetX = this.getX(e);
        this.moveOffsetY = this.getY(e);
      }
    },

    mousemoveHandler: function(e) {
      if(this.resizing) {
        this.resize(e);
      }
      else if(this.moving) {
        this.move(e);
      }
    },

    mouseupHandler: function(e) {
      e.stopPropagation();
      this.resizing = false;
      this.moving = false;
    },

    resize: function(e) {
      this.model.updateSize(
        e.pageX + this.resizeOffsetX,
        e.pageY + this.resizeOffsetY
      );
    },

    move: function(e) {
      this.model.set({
        x: e.pageX - this.moveOffsetX,
        y: e.pageY - this.moveOffsetY
      });
    }

  });

  return Editable;

});

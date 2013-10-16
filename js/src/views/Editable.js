define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'utils/KeyCodes'
], function($, _, Backbone, CONFIG, KeyCodes) {

  var Editable = Backbone.View.extend({

    tagName: 'div',
    className: 'editable creating',
    attributes: {'contenteditable': true},

    initialize: function() {
      this.listenTo(this.model, 'change', this.setCss);
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
        height: this.model.get('height'),
        '-webkit-transform': 'rotate(' + (this.model.get('rotation') || 0) + 'deg)',
        transform: 'rotate(' + (this.model.get('rotation') || 0) + ')',
        'font-size': (this.model.get('fontSize') || 1) + 'em'
      });
      return true;
    },

    events: {
      'mousedown': 'mousedownHandler',
      'mousemove': 'mousemoveHandler',
      'mouseup': 'mouseupHandler',
      'keydown': 'keydownHandler'
    },

    getX: function(e) {
      return e.pageX - this.$el.offset().left;
    },

    getY: function(e) {
      return e.pageY - this.$el.offset().top;
    },

    isResizeHit: function(e) {
      return this.$el.width() - this.getX(e) <= CONFIG.resizeHandleSize &&
        this.$el.height() - this.getY(e) <= CONFIG.resizeHandleSize;
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
      if(!this.options.parentView.mouseDown) {
        if(this.resizing) {
          this.resize(e);
        }
        else if(this.moving) {
          this.move(e);
        }
      }
    },

    mouseupHandler: function(e) {
      this.resizing = false;
      this.moving = false;
    },

    keydownHandler: function(e) {
      if(e.ctrlKey) {
        switch(e.keyCode) {
          case KeyCodes.R:
            this.model.set({
              rotation: (this.model.get('rotation') || 0) + 15 * (e.shiftKey ? -1 : 1)
            });
            break;
          case KeyCodes.F:
            this.model.set({
              fontSize: (this.model.get('fontSize') || 1) * (e.shiftKey ? 0.75 : 1/0.75)
            });
            break;
        }
      }
    },

    resize: function(e) {
      this.model.updateSize(
        e.pageX + this.resizeOffsetX,
        e.pageY + this.resizeOffsetY
      );
    },

    move: function(e) {
      var newX = e.pageX - this.moveOffsetX,
        newY = e.pageY - this.moveOffsetY,
        maxX = this.options.parentView.$el.width() - this.model.get('width'),
        maxY = this.options.parentView.$el.height() - this.model.get('height');
      this.model.set({
        x: Math.min(Math.max(newX, 0), maxX),
        y: Math.min(Math.max(newY, 0), maxY)
      });
    }

  });

  return Editable;

});

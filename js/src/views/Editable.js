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
        '-moz-transform': 'rotate(' + this.model.get('rotation') + 'deg)',
        '-webkit-transform': 'rotate(' + this.model.get('rotation') + 'deg)',
        transform: 'rotate(' + this.model.get('rotation') + ')',
        'font-size': this.model.get('fontSize') + 'em'
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
      return e.pageX - this.model.get('x');
    },

    getY: function(e) {
      return e.pageY - this.model.get('y');
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
              rotation: this.model.get('rotation') + 15 * (e.shiftKey ? -1 : 1)
            });
            break;
          case KeyCodes.F:
            this.model.set({
              fontSize: this.model.get('fontSize') * (e.shiftKey ? 0.75 : 1/0.75)
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
      this.model.set({
        x: e.pageX - this.moveOffsetX,
        y: e.pageY - this.moveOffsetY
      });
    }

  });

  return Editable;

});

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
      this.listenTo(this.model, 'change:x', this.setPosition);
      this.listenTo(this.model, 'change:y', this.setPosition);
      this.listenTo(this.model, 'change:width', this.setSize);
      this.listenTo(this.model, 'change:height', this.setSize);
      this.listenTo(this.model, 'change:rotation', this.setRotation);
      this.listenTo(this.model, 'change:fontSize', this.setFontSize);
    },

    render: function(parent) {
      this.setCss();
      parent.append(this.$el);
    },

    setPosition: function() {
      this.$el.css({
        left: this.model.get('x'),
        top: this.model.get('y')
      });
    },

    setSize: function() {
      this.$el.css({
        width: this.model.get('width'),
        height: this.model.get('height')
      });
    },

    setRotation: function() {
      this.$el.css({
        '-moz-transform': 'rotate(' + this.model.get('rotation') + 'deg)',
        '-webkit-transform': 'rotate(' + this.model.get('rotation') + 'deg)',
        transform: 'rotate(' + this.model.get('rotation') + ')'
      });
    },

    setFontSize: function() {
      this.$el.css({
        'font-size': this.model.get('fontSize') + 'em'
      });
    },

    setCss: function() {
      this.setPosition();
      this.setSize();
      this.setRotation();
      this.setFontSize();
    },

    events: {
      'mousedown': 'mousedownHandler',
      'mousemove': 'mousemoveHandler',
      'mouseup': 'mouseupHandler',
      'keydown': 'keydownHandler',
      'keyup': 'keyupHandler'
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

    keyupHandler: function(e) {
      this.model.set({
        content: this.$el.html()
      });
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

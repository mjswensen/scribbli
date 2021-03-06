define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'utils/KeyCodes',
  'utils/Fonts'
], function($, _, Backbone, CONFIG, KeyCodes, Fonts) {

  var Editable = Backbone.View.extend({

    tagName: 'div',
    className: 'editable',
    attributes: {'contenteditable': true},

    initialize: function() {
      this.listenTo(this.model, 'change:x', this.setPosition);
      this.listenTo(this.model, 'change:y', this.setPosition);
      this.listenTo(this.model, 'change:width', this.setSize);
      this.listenTo(this.model, 'change:height', this.setSize);
      this.listenTo(this.model, 'change:rotation', this.setRotation);
      this.listenTo(this.model, 'change:fontSize', this.setFontSize);
      this.listenTo(this.model, 'change:font', this.setFont);
    },

    render: function() {
      this.setPosition();
      this.setSize();
      this.setRotation();
      this.setFontSize();
      this.setContent();
      this.setFont();
      this.options.parentView.$el.append(this.$el);
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

    setContent: function() {
      this.$el.html(this.model.get('content'));
    },

    setFont: function() {
      this.$el
        .removeClass(Fonts.getAll())
        .addClass(this.model.get('font'));
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
        if(e.altKey) {
          if(e.keyCode == KeyCodes.F) {
            this.model.set({
              font: Fonts.getNext(this.model.get('font'))
            });
          }
        } else {
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
      } else if(e.keyCode == KeyCodes.ESC) {
        this.$el.blur();
      } else if(e.keyCode == KeyCodes.TAB) {
        e.preventDefault();
        this.insertText('\u00A0\u00A0');
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
    },

    insertText: function(text) {
      var sel, range;
      if (window.getSelection) {
          sel = window.getSelection();
          if (sel.getRangeAt && sel.rangeCount) {
              range = sel.getRangeAt(0);
              range.deleteContents();
              range.insertNode( document.createTextNode(text) );
          }
      } else if (document.selection && document.selection.createRange) {
          document.selection.createRange().text = text;
      }
    }

  });

  return Editable;

});

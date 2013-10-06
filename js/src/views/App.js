define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'models/Editable',
  'views/Editable'
], function($, _, Backbone, CONFIG, Editable, EditableView) {

  var App = Backbone.View.extend({

    el: '#whiteboard',

    initialize: function() {
      this.offset = this.$el.offset();
      this.leftPressed = false;
      this.rightPressed = false;
    },

    events: {
      'mousedown': 'mousedownHandler',
      'mouseup': 'mouseupHandler',
      'mousemove': 'mousemoveHandler'
    },

    mousedownHandler: function(e) {
      this.mouseDown = true;
      switch (e.which) {
        case 1:// Left click
          this.editable = this.createNewEditable(e);
          break;
        case 3:// Right click
          // TODO
          break;
        default:
          return;
      }
    },

    mousemoveHandler: function(e) {
      if(this.mouseDown) {
        switch (e.which) {
          case 1:// Left click
            this.updateEditableSize(e);
            break;
          default:
            return;
        }
      }
    },

    mouseupHandler: function(e) {
      this.mouseDown = false;
      switch (e.which) {
        case 1:// Left click
          this.editable.view.$el.removeClass('creating').focus();
          break;
        case 2:
          // TODO
          break
        default:
          return;
      }
    },

    getX: function(e) {
      return e.pageX - this.offset.left;
    },

    getY: function(e) {
      return e.pageY - this.offset.top;
    },

    updateEditableSize: function(e) {
      this.editable.updateSize(this.getX(e), this.getY(e));
    },

    createNewEditable: function(e) {
      var model = new Editable({
        x: this.getX(e),
        y: this.getY(e),
        width: CONFIG.editableMinWidth,
        height: CONFIG.editableMinHeight
      });
      var view = new EditableView({ model: model });
      model.view = view;
      view.render(this.$el);
      return model;
    }

  });

  return App;

});

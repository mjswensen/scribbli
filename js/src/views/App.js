define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'models/Editable',
  'views/Editable',
  'models/Path',
  'views/Path'
], function($, _, Backbone, CONFIG, Editable, EditableView, Path, PathView) {

  var App = Backbone.View.extend({

    el: '#whiteboard',

    initialize: function() {
      this.offset = this.$el.offset();
      this.svg = this.$('svg');
      this.setSvgViewbox();
      // TODO: Call this.setSvgViewbox on window.resize
    },

    setSvgViewbox: function() {
      this.svg.attr('viewbox', '0 0 ' + this.svg.width() + ' ' + this.svg.height());
    },

    events: {
      'mousedown': 'mousedownHandler',
      'mouseup': 'mouseupHandler',
      'mousemove': 'mousemoveHandler'
    },

    mousedownHandler: function(e) {
      this.captureEventState(e);
      if(this.altKey) {
        this.path = this.createNewPath(e);
      } else {
        this.editable = this.createNewEditable(e);
      }
    },

    mousemoveHandler: function(e) {
      if(this.mouseDown) {
        if(this.altKey) {
          this.path.addPoint(this.getX(e), this.getY(e));
        } else {
          this.editable.updateSize(this.getX(e), this.getY(e));
        }
      }
    },

    mouseupHandler: function(e) {
      this.captureEventState(e);
      if(this.editable) {
        this.editable.view.$el.removeClass('creating').focus();
      }
      this.editable = null;
      this.path = null;
    },

    captureEventState: function(e) {
      this.mouseDown = e.type == 'mousedown' || e.type == 'mousemove';
      this.altKey = e.altKey;
    },

    getX: function(e) {
      return e.pageX - this.offset.left;
    },

    getY: function(e) {
      return e.pageY - this.offset.top;
    },

    createNewEditable: function(e) {
      var model = new Editable({
        x: this.getX(e),
        y: this.getY(e),
        width: CONFIG.editableMinWidth,
        height: CONFIG.editableMinHeight
      });
      var view = new EditableView({ model: model, parentView: this });
      view.render(this.$el);// TODO: use parentView insead?
      return model;
    },

    createNewPath: function(e) {
      var model = new Path({
        points: [{
          x: this.getX(e),
          y: this.getY(e)
        }]
      });
      var view = new PathView({ model: model, svg: this.$('svg').get(0) });
      view.render();
      return model;
    }

  });

  return App;

});

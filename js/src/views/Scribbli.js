define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'models/Editable',
  'views/Editable',
  'models/Path',
  'views/Path',
  'models/Scribbli'
], function($, _, Backbone, CONFIG, Editable, EditableView, Path, PathView, ScribbliModel) {

  var Scribbli = Backbone.View.extend({

    el: '#scribbli',

    initialize: function() {
      this.offset = this.$el.offset();
      this.initializeSvg();
      // TODO: Call this.initializeSvg on window.resize
    },

    render: function() {
      // Remove previous elements
      this.$el.empty();
      // Replace SVG
      this.$el.append(
        $(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
          .attr({
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1'
          }));
      this.initializeSvg();
      // Render editables
      this.options.app.get('currentScribbli').get('editables').each(function(editable) {
        var view = new EditableView({ model: editable, parentView: this });
        editable.view = view;
        view.render();
      }, this);
      // Render paths
      this.options.app.get('currentScribbli').get('paths').each(function(path) {
        var view = new PathView({ model: path, svg: this.$('svg').get(0) });
        path.view = view;
        view.render();
      }, this);
    },

    initializeSvg: function() {
      this.svg = this.$('svg');
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
      view.render();
      model.view = view;
      this.options.app.get('currentScribbli').get('editables').add(model);
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
      this.options.app.get('currentScribbli').get('paths').add(model);
      return model;
    }

  });

  return Scribbli;

});

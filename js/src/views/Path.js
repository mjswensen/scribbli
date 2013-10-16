define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var Path = Backbone.View.extend({

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      var svgns = 'http://www.w3.org/2000/svg',
        points = this.model.get('points').slice(),// .slice() to get a copy
        initialPoint = points.shift(),
        dataAttr;
      if(!this.path) {
        this.path = document.createElementNS(svgns, 'path');
        this.path.setAttributeNS(null, 'stroke', '#2B3D4F');
        this.path.setAttributeNS(null, 'fill', 'none');
        this.options.svg.appendChild(this.path);
      }
      dataAttr = _.reduce(points, function(memo, point) {
        return memo + ' L ' + point.x + ',' + point.y;
      }, 'M ' + initialPoint.x + ',' + initialPoint.y, this);
      this.path.setAttributeNS(null, 'd', dataAttr);
    }

  });

  return Path;

});

define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var Path = Backbone.Model.extend({

    addPoint: function(x, y) {
      // console.log(this.get('points'));
      this.get('points').push({x: x, y: y});
      this.trigger('change');
    }

  });

  return Path;

});

define([
  'jquery',
  'underscore',
  'backbone',
  'models/Path'
], function($, _, Backbone, Path) {

  var Paths = Backbone.Collection.extend({

    model: Path

  });

  return Paths;

});

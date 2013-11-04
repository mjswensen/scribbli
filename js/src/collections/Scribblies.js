define([
  'jquery',
  'underscore',
  'backbone',
  'models/Scribbli'
], function($, _, Backbone, Scribbli) {

  var Scribblies = Backbone.Collection.extend({

    model: Scribbli

  });

  return Scribblies;

});

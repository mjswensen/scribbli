define([
  'jquery',
  'underscore',
  'backbone',
  'models/Editable'
], function($, _, Backbone, Editable) {

  var Editables = Backbone.Collection.extend({

    model: Editable

  });

  return Editables;

});

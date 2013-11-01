define([
  'jquery',
  'underscore',
  'backbone',
  'views/Scribbli',
  'views/ScribbliList'
], function($, _, Backbone, Scribbli, ScribbliList) {

  var App = Backbone.View.extend({

    initialize: function() {
      this.scribbli = new Scribbli();
      this.scribbliList = new ScribbliList();
    }

  });

  return App;

});

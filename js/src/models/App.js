define([
  'jquery',
  'underscore',
  'backbone',
  'utils/Debounce',
  'collections/Editables',
  'collections/Paths'
], function($, _, Backbone, Debounce, Editables, Paths) {

  var App = Backbone.Model.extend({

    initialize: function() {
      this.currentId = Math.random().toString(36).substr(2,5);
      this.editables = new Editables();
      this.paths = new Paths();
      this.listenTo(this.editables, 'change', Debounce(this.save, 375, this));
      this.listenTo(this.paths, 'change', Debounce(this.save, 375, this));
    },

    save: function() {
      var data = {
        modified: (new Date()).getTime(),
        editables: this.editables.toJSON(),
        paths: this.paths.toJSON()
      };
      localStorage.setItem(this.currentId, JSON.stringify(data));
    }

  });

  return App;

});

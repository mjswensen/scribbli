define([
  'jquery',
  'underscore',
  'backbone',
  'utils/Debounce',
  'collections/Editables',
  'collections/Paths'
], function($, _, Backbone, Debounce, Editables, Paths) {

  var Scribbli = Backbone.Model.extend({

    initialize: function() {
      this.listenTo(this.get('editables'), 'change', Debounce(this.save, 375, this));
      this.listenTo(this.get('paths'), 'change', Debounce(this.save, 375, this));
    },

    defaults: {
      id: Math.random().toString(36).substr(2,5),
      editables: new Editables(),
      paths: new Paths()
    },

    parse: function(data) {
      this.set({
        id: data.id,
        modified: data.modified,
        editables: new Editables(data.editables),
        paths: new Paths(data.paths)
      });
    },

    save: function() {
      this.set({ modified: (new Date()).getTime() });
      localStorage.setItem(this.get('id'), JSON.stringify(this.toJSON()));
    }

  });

  return Scribbli;

});

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
      this.set({
        id: (new Date().getTime()).toString(36),
        editables: new Editables(),
        paths: new Paths()
      });
      this.listen();
    },

    listen: function() {
      this.stopListening();
      this.listenTo(this.get('editables'), 'change', Debounce(this.save, 375, this));
      this.listenTo(this.get('paths'), 'change', Debounce(this.save, 375, this));
    },

    parse: function(data) {
      this.set({
        id: data.id,
        modified: data.modified,
        editables: new Editables(data.editables),
        paths: new Paths(data.paths)
      });
      this.listen();
    },

    save: function() {
      this.set({ modified: (new Date()).getTime() }, { silent: true });
      localStorage.setItem(this.get('id'), JSON.stringify(this.toJSON()));
      this.trigger('change');// We need to trigger change after save so that list renders properly on new scribblies.
    },

    isSaved: function() {
      return this.get('id') in localStorage;
    },

    remove: function() {
      localStorage.removeItem(this.get('id'));
    }

  });

  return Scribbli;

});

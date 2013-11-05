define([
  'jquery',
  'underscore',
  'backbone',
  'models/Scribbli',
  'collections/Scribblies',
  'views/Scribbli',
  'views/ScribbliList'
], function($, _, Backbone, Scribbli, Scribblies, ScribbliView, ScribbliListView) {

  var App = Backbone.Model.extend({

    defaults: {
      scribblies: new Scribblies()
    },

    initialize: function() {
      var key;

      for(key in localStorage) {
        this.get('scribblies').unshift(this.scribbliFromKey(key));
      }

      if(!this.get('scribblies').length) {
        this.set({ currentScribbli: new Scribbli() });
        this.get('scribblies').unshift(this.get('currentScribbli'));
      } else {
        this.set({ currentScribbli: this.get('scribblies').at(0) });
      }

      this.set({
        scribbliView: new ScribbliView({ app: this })
      });
      this.get('scribbliView').render();

      this.set({
        scribbliListView: new ScribbliListView({ app: this })
      });
      this.get('scribbliListView').render();

      // Rerender the list to get updated modified timestamp.
      this.listenTo(this.get('scribblies'), 'change', function() {
        this.get('scribbliListView').render();
      });
    },

    scribbliFromKey: function(key) {
      var scribbli = new Scribbli();
      scribbli.parse(JSON.parse(localStorage[key]));
      return scribbli;
    },

    chooseScribbli: function(scribbli) {
      this.set({ currentScribbli: scribbli });
      this.get('scribbliView').render();
      this.get('scribbliListView').render();
    },

    newScribbli: function() {
      var scribbli = new Scribbli();
      this.get('scribblies').unshift(scribbli);
      this.set({ currentScribbli: scribbli });
      this.get('scribbliView').render();
      this.get('scribbliListView').render();
    }

  });

  return App;

});

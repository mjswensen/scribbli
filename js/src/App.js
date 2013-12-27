define([
  'jquery',
  'underscore',
  'backbone',
  'models/Scribbli',
  'collections/Scribblies',
  'views/Scribbli',
  'views/ScribbliList',
  'views/About'
], function($, _, Backbone, Scribbli, Scribblies, ScribbliView, ScribbliListView, About) {

  var App = Backbone.Model.extend({

    defaults: {
      scribblies: new Scribblies()
    },

    initialize: function() {
      var key,
        localData;

      for(key in localStorage) {
        localData = JSON.parse(localStorage[key]);
        if(Scribbli.isScribbliData(localData)) {
          this.get('scribblies').unshift((new Scribbli()).parse(localData));
        }
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

      // Initialize the about modal dialog
      new About();
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
    },

    deleteScribbli: function(scribbli) {
      var newScribbli;
      this.get('scribblies').remove(scribbli);
      if(scribbli == this.get('currentScribbli')) {
        if(this.get('scribblies').length) {
          this.set({ currentScribbli: this.get('scribblies').at(0) });
        } else {
          newScribbli = new Scribbli();
          this.get('scribblies').add(newScribbli);
          this.set({ currentScribbli: newScribbli });
        }
      }
      scribbli.remove();
      this.get('scribbliView').render();
      this.get('scribbliListView').render();
    }

  });

  return App;

});

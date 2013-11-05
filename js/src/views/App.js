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
      currentScribbli: new Scribbli(),
      scribblies: new Scribblies()
    },

    initialize: function() {
      var key;

      for(key in localStorage) {
        this.get('scribblies').unshift(this.scribbliFromKey(key));
      }

      this.get('scribblies').unshift(this.get('currentScribbli'));

      this.set({
        scribbliView: new ScribbliView({ app: this })
      });
      this.get('scribbliView').render();

      this.set({
        scribbliListView: new ScribbliListView({ app: this })
      });
      this.get('scribbliListView').render();
    },

    scribbliFromKey: function(key) {
      var scribbli = new Scribbli();
      scribbli.parse(JSON.parse(localStorage[key]));
      return scribbli;
    }

  });

  return App;

});

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
      scribblies: new Scribblies(),
      scribbliView: new ScribbliView()
    },

    initialize: function() {
      var key,
        scribbli;

      for(key in localStorage) {
        scribbli = new Scribbli();
        scribbli.parse(JSON.parse(localStorage[key]));
        this.get('scribblies').unshift(scribbli);
      }

      this.get('scribblies').unshift(this.get('currentScribbli'));

      this.get('scribbliView').model = this.get('currentScribbli');
      this.get('scribbliView').render();

      this.set({
        scribbliListView: new ScribbliListView({ app: this })
      });
      this.get('scribbliListView').render();
    }

  });

  return App;

});

define([
  'jquery',
  'underscore',
  'backbone',
  'views/ScribbliListItem'
], function($, _, Backbone, ScribbliListItem) {

  var ScribbliList = Backbone.View.extend({

    el: '#scribbli-list',

    render: function() {
      this.options.app.get('scribblies').each(function(scribbli) {
        var listItemView = new ScribbliListItem({ model: scribbli, parentView: this });
        listItemView.render();
      }, this);
    }

  });

  return ScribbliList;

});

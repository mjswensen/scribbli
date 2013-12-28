define([
  'jquery',
  'underscore',
  'backbone',
  'views/ScribbliListItem'
], function($, _, Backbone, ScribbliListItem) {

  var ScribbliList = Backbone.View.extend({

    el: '#scribbli-list',

    render: function() {
      this.$el.empty().append(
        $(document.createElement('li'))
          .addClass('new-scribbli')
          .text('+ New Scribbli'));
      this.options.app.get('scribblies').each(function(scribbli) {
        var listItemView = new ScribbliListItem({ model: scribbli, parentView: this });
        listItemView.render();
      }, this);
    },

    events: {
      'click .new-scribbli': 'newScribbli'
    },

    newScribbli: function() {
      this.options.app.newScribbli();
    },

    setMaxHeight: function(maxHeight) {
      this.$el.css('max-height', maxHeight);
    }

  });

  return ScribbliList;

});

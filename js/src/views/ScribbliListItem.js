define([
  'jquery',
  'underscore',
  'backbone',
  'moment'
], function($, _, Backbone, moment) {

  var ScribbliListItem = Backbone.View.extend({

    tagName: 'li',
    className: 'scribbli',

    render: function() {
      this.$el.empty()
        .append(
          $(document.createElement('span'))
            .text(this.model.get('id') + (!this.model.isSaved() ? ' *' : '')))
        .append(
          $(document.createElement('span'))
            .addClass('delete')
            .html('&times;'))
        .append(
          $(document.createElement('span'))
            .addClass('modified')
            .text(moment(this.model.get('modified')).calendar()));
      if(this.model == this.options.parentView.options.app.get('currentScribbli')) {
        this.$el.addClass('selected');
      }
      this.options.parentView.$el.append(this.$el);
    },

    events: {
      'click': 'chooseScribbli',
      'click .delete': 'deleteScribbli'
    },

    chooseScribbli: function() {
      this.options.parentView.options.app.chooseScribbli(this.model);
    },

    deleteScribbli: function(e) {
      e.stopPropagation();
      this.options.parentView.options.app.deleteScribbli(this.model);
    }

  });

  return ScribbliListItem;

});

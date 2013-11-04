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
            .text(this.options.model.get('id')))
        .append(
          $(document.createElement('span'))
            .addClass('modified')
            .text(moment(this.options.model.get('modified')).calendar()));
      if(this.options.model == this.options.parentView.options.app.get('currentScribbli')) {
        this.$el.addClass('selected');
      }
      this.options.parentView.$el.append(this.$el);
    }

  });

  return ScribbliListItem;

});

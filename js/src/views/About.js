define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var About = Backbone.View.extend({

    el: '#about-dialog-wrapper',

    initialize: function() {
      // Breaking the normal backbone view scoping here,
      // since this isn't really part of the application.
      $('.about').on('click', this.show.bind(this));
    },

    events: {
      'click .overlay': 'hide',
      'click .close': 'hide'
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    }

  });

  return About;

});

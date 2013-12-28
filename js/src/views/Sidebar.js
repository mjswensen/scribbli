define([
  'jquery',
  'underscore',
  'backbone',
  'views/ShortcutList',
  'views/ScribbliList'
], function($, _, Backbone, ShortcutList, ScribbliList) {

  var Sidebar = Backbone.View.extend({

    el: '#sidebar',

    initialize: function() {
      this.shortcutList = new ShortcutList({ parentView: this });
      this.scribbliList = new ScribbliList({ app: this.options.app });
    },

    render: function() {
      this.shortcutList.render();
      this.scribbliList.render();
      this.setScribbliListMaxHeight();
    },

    setScribbliListMaxHeight: function() {
      var maxHeight = this.$el.height();
      maxHeight -= this.$('header').outerHeight(true);
      maxHeight -= this.shortcutList.$el.outerHeight(true);
      maxHeight -= this.$('footer').outerHeight(true);
      this.scribbliList.setMaxHeight(maxHeight);
    }

  });

  return Sidebar;

});

define([
  'jquery',
  'underscore',
  'backbone',
  'config'
], function($, _, Backbone, CONFIG) {

  var ShortcutList = Backbone.View.extend({

    initialize: function() {
      this.collapsed = CONFIG.user.collapseShortcuts();
    },

    el: '#shortcut-list-wrapper',

    shortcuts: [
      {
        actions: ['click', 'drag'],
        desc: 'Create Notes',
        alwaysShown: true
      }, {
        keys: ['alt'],
        actions: ['click', 'drag'],
        desc: 'Draw lines',
        alwaysShown: true
      }, {
        keys: ['ctrl', 'alt', 'F'],
        desc: 'Change note font'
      }, {
        keys: ['ctrl', 'F'],
        desc: 'Increase note font size'
      }, {
        keys: ['shift', 'ctrl', 'F'],
        desc: 'Decrease note font size'
      }, {
        keys: ['ctrl', 'R'],
        desc: 'Rotate note 15&deg;'
      }, {
        keys: ['shift', 'ctrl', 'R'],
        desc: 'Rotate note -15&deg;'
      }, {
        keys: ['ctrl', 'B'],
        desc: 'Toggle note bold'
      }, {
        keys: ['ctrl', 'I'],
        desc: 'Toggle note italic'
      }, {
        keys: ['ctrl', 'U'],
        desc: 'Toggle note underline'
      }
    ],

    events: {
      'click .toggle': 'toggle'
    },

    render: function() {
      this.scribbliList = $(document.createElement('ol')).attr('id', 'shortcut-list');
      this.$el.append(this.scribbliList);
      _.each(this.shortcuts, function(shortcut) {
        var combination = (_.map(shortcut.keys, function(key) { return '<span class="key">' + key + '</span>'; }) || [])
          .concat(shortcut.actions || [])
          .join(' + ');
        this.scribbliList.append(
          $(document.createElement('li')).addClass('shortcut')
            .append(
              $(document.createElement('span')).addClass('combination').append(combination))
            .append(
              $(document.createElement('span')).addClass('description').html(shortcut.desc)));
      }, this);
      this.toggle = $(document.createElement('div')).addClass('toggle');
      this.setToggleText();
      this.$el.append(this.toggle);
      this.setShortcutListHeight();
    },

    toggle: function() {
      this.collapsed = !this.collapsed;
      this.setShortcutListHeight();
      this.options.parentView.setScribbliListMaxHeight();
      this.setToggleText();
      CONFIG.user.collapseShortcuts(this.collapsed);
    },

    setToggleText: function() {
      this.toggle.html(this.collapsed ? '&darr; More' : '&uarr; Less');
    },

    setShortcutListHeight: function() {
      if(this.collapsed) {
        this.scribbliList.css('height', this.$('.shortcut').first().outerHeight(true) * _.where(this.shortcuts, {alwaysShown: true}).length);
      } else {
        this.scribbliList.css('height', '');
      }
    }

  });

  return ShortcutList;

});

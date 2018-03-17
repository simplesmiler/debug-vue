/*
    debug-vue
    Version: 0.2.0
    Licence: MIT
    (c) Denis Karabaza
  */
  
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.DebugVue = factory());
}(this, (function () { 'use strict';

var mixin = {

  props: {
    name: { type: String },
    value: {},
    noClone: { type: Boolean, default: false },
    noLog: { type: Boolean, default: false },
    noBreak: { type: Boolean, default: false }
  },

  render: function () {
    return null;
  },

  methods: {
    _logname: function (componentName) {
      return this.name ? '<' + componentName + ' name="' + this.name + '">' : '<' + componentName + '>';
    },
    _prepareValue: function (value) {
      if (this.noClone) return value;

      try {
        var clone = JSON.parse(JSON.stringify(value));
        return clone;
      } catch (err) {
        return value;
      }
    }
  }

};

var DebugHook = {

  props: {
    on: { type: [String, Array], default: 'mounted' },
    parent: { type: Boolean, default: false }
  },

  mixins: [mixin],

  computed: {
    realOn: function () {
      return Array.isArray(this.on) ? this.on : [this.on];
    },
    realTarget: function () {
      return this.parent ? this.$parent : this;
    }
  },

  created: function () {
    this.handles = {};

    for (var i = 0; i < this.realOn.length; i++) {
      var hook = this.realOn[i];
      var handle = this.handles[hook] = this._makeHandle(hook);
      this.realTarget.$on('hook:' + hook, handle);
    }
  },

  destroyed: function () {
    for (var i = 0; i < this.realOn.length; i++) {
      var hook = this.realOn[i];
      var handle = this.handles[hook];
      this.realTarget.$off('hook:' + hook, handle);
    }
  },

  methods: {
    _makeHandle: function (hook) {
      return function () {
        this.handle(this.$el, this._logname('debug-hook'), hook, this._prepareValue(this.value));
      }.bind(this);
    },
    handle: function (el, logname, hook, value) {
      if (!this.noLog) console.log(logname, hook, value);
      if (!this.noBreak) debugger;
    }
  }

};

var DebugWatch = {

  props: {
    immediate: { type: Boolean, default: false },
    deep: { type: Boolean, default: false }
  },

  mixins: [mixin],

  created: function () {
    this.$watch('value', this._handle, { immediate: this.immediate, deep: this.deep });
  },

  methods: {
    _handle: function (value, oldValue) {
      this.handle(this.$el, this._logname('debug-watch'), this._prepareValue(value), this._prepareValue(oldValue));
    },
    handle: function (el, logname, value, oldValue) {
      if (!this.noLog) console.log(logname, oldValue, '->', value);
      if (!this.noBreak) debugger;
    }
  }

};

function install(Vue) {
  Vue.component('debug-hook', DebugHook);
  Vue.component('debug-watch', DebugWatch);
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({ install: install });
}

var index = {
  install: install,
  DebugWatch: DebugWatch,
  DebugHook: DebugHook
};

return index;

})));
//# sourceMappingURL=debug-vue.js.map

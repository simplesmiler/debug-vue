import mixin from './mixin';

export default {

  props: {
    on: { type: [String, Array], default: 'mounted' },
    parent: { type: Boolean, default: false },
  },

  mixins: [mixin],

  computed: {
    realOn: function() {
      return Array.isArray(this.on) ? this.on : [this.on];
    },
    realTarget: function() {
      return this.parent ? this.$parent : this;
    },
  },

  created: function() {
    this.handles = {};

    for (var i = 0; i < this.realOn.length; i++) {
      var hook = this.realOn[i];
      var handle = this.handles[hook] = this._makeHandle(hook);
      this.realTarget.$on('hook:' + hook, handle);
    }
  },

  destroyed: function() {
    for (var i = 0; i < this.realOn.length; i++) {
      var hook = this.realOn[i];
      var handle = this.handles[hook];
      this.realTarget.$off('hook:' + hook, handle);
    }
  },

  methods: {
    _makeHandle: function(hook) {
      return function() {
        this.handle(this.$el, this._logname('debug-hook'), hook, this._prepareValue(this.value));
      }.bind(this);
    },
    handle: function(el, logname, hook, value) {
      if (!this.noLog) console.log(logname, hook, value);
      if (!this.noBreak) debugger;
    },
  },

};

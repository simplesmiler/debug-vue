import mixin from './mixin';

export default {

  props: {
    immediate: { type: Boolean, default: false },
    deep: { type: Boolean, default: false },
  },

  mixins: [mixin],

  created: function() {
    this.$watch('value', this._handle, { immediate: this.immediate, deep: this.deep });
  },

  methods: {
    _handle: function(value, oldValue) {
      this.handle(this.$el, this._logname('debug-watch'), this._prepareValue(value), this._prepareValue(oldValue));
    },
    handle: function(el, logname, value, oldValue) {
      if (!this.noLog) console.log(logname, oldValue, '->', value);
      if (!this.noBreak) debugger;
    },
  },

};

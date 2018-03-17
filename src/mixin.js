export default {

  props: {
    name: { type: String },
    value: {},
    noClone: { type: Boolean, default: false },
    noLog: { type: Boolean, default: false },
    noBreak: { type: Boolean, default: false },
  },

  render: function() {
    return null;
  },

  methods: {
    _logname: function(componentName) {
      return this.name ? '<' + componentName + ' name="' + this.name + '">' : '<' + componentName + '>';
    },
    _prepareValue: function(value) {
      if (this.noClone) return value;

      try {
        var clone = JSON.parse(JSON.stringify(value));
        return clone;
      }
      catch (err) {
        return value;
      }
    },
  },

};

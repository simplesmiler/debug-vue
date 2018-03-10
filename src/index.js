import DebugHook from './debug-hook';
import DebugWatch from './debug-watch';

export var version = '0.1.0';
export default plugin;

function plugin(Vue) {
  Vue.component('debug-hook', DebugHook);
  Vue.component('debug-watch', DebugWatch);
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

import DebugHook from './debug-hook';
import DebugWatch from './debug-watch';

function install(Vue) {
  Vue.component('debug-hook', DebugHook);
  Vue.component('debug-watch', DebugWatch);
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({ install: install });
}

export default {
  install: install,
  DebugWatch: DebugWatch,
  DebugHook: DebugHook,
};

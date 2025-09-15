// Polyfill for process object
if (typeof process === 'undefined') {
  window.process = {
    env: {
      NODE_ENV: 'development',
      NODE_DEBUG: ''
    },
    versions: {},
    browser: true,
    nextTick: (callback) => {
      setTimeout(callback, 0);
    }
  };
}

// Import this file at the top of your index.js file
// import './polyfills';

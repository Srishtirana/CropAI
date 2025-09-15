// Setup for process polyfill
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// Configure Enzyme
configure({ adapter: new Adapter() });

// Polyfill for process object
if (typeof process === 'undefined') {
  global.process = require('process');
} else {
  const bProcess = require('process');
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p];
    }
  }
}

// Polyfill for Buffer
if (typeof global.Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}

// Polyfill for global
if (typeof global === 'undefined') {
  window.global = window;
}

// Polyfill process for the browser
if (typeof window !== 'undefined') {
  window.process = {
    env: {
      NODE_ENV: 'development'
    },
    nextTick: (callback) => {
      setTimeout(callback, 0);
    }
  };
}

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

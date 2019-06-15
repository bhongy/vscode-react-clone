'use strict';

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@code': path.resolve(__dirname, 'src/renderer'),
    },
  },
};

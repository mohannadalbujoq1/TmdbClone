const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src/')
    },
    resolve: {
      extensions: ['.js', '.jsx'] 
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1'
      }
    }
  }
};
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'], // global setup (e.g., TextEncoder)
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', 'src'], // to allow importing like 'components/...'
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // mock CSS files
    '\\.(jpg|jpeg|png|gif|svg)$': path.resolve(__dirname, 'mocks/fileMock.js'),
  },
};

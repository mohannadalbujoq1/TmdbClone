// setupTests.js
import '@testing-library/jest-dom';
import 'jest-fetch-mock';


import '@testing-library/jest-dom/extend-expect';
// src/setupTests.js
global.fetch = require('jest-fetch-mock');

global.fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', require('jest-fetch-mock'));
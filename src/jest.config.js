module.exports = {
  testEnvironment: 'jsdom',
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  setupFiles: ["react-app-polyfill/jsdom"],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}", "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest",
    "^.+\\.css$": "jest-css-modules-transform",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "file-transform",
  },
  transformIgnorePatterns: ["node_modules/(?!(axios)/)"],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "\\.(css|less|scss|sss|styl)$": "identity-obj-proxy",
    "^../api/movies$": "<rootDir>/src/__mocks__/api/movies.js"
  },
  moduleFileExtensions: ["web.js", "js", "web.ts", "ts", "web.tsx", "tsx", "json", "web.jsx", "jsx", "node"],
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
  resetMocks: true
};

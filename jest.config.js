module.exports = {
  automock: false,
  rootDir: './src',
  setupFiles: ['../config/setupTests.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coverageReporters: ['text', 'json', 'lcov'],
  coverageDirectory: './coverage',
  watchman: false,
};

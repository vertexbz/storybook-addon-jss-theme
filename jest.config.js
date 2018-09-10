module.exports = {
  testPathIgnorePatterns: ['./example', './config'],
  setupFiles: ['./config/setupTests.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  //moduleFileExtensions: ['js'],
  coverageReporters: ['text', 'json', 'lcov'],
  coverageDirectory: './coverage',
  watchman: false,
};

module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/tests/unit/**/*.test.js'],
    collectCoverageFrom: ['src/**/*.js'],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
  };
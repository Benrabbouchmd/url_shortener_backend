module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/e2e/**/*.test.js'],
  setupFilesAfterEnv: ['./tests/setup.js'],
  testTimeout: 30000
};
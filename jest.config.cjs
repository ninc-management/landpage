const nextJest = require('next/jest');
module.exports = nextJest({ dir: './' })({
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  testMatch: ['<rootDir>/components/**/*.test.{ts,tsx}', '<rootDir>/lib/**/*.test.{ts,tsx}'],
  modulePathIgnorePatterns: ['<rootDir>/out/', '<rootDir>/.next/'],
});

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', 'jest-styled-components'],
  moduleDirectories: ['node_modules', '<rootDir>/src/'],
  moduleNameMapper: { '^@/hooks/(.*)$': '<rootDir>hooks/$1' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/src/cypress'],
  testEnvironment: 'jest-environment-jsdom',
  testTimeout: 90000,
};

module.exports = createJestConfig(customJestConfig);

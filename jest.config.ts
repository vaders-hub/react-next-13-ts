const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', 'jest-styled-components'],
  moduleDirectories: ['node_modules', '<rootDir>/src/'],
  moduleNameMapper: { '^@/hooks/(.*)$': '<rootDir>hooks/$1' },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);

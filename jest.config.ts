import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {},
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'jest-preset-angular',
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
};

export default config;

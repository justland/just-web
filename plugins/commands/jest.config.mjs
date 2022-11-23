/** @type {import('jest').Config} */
export default {
  displayName: 'commands',
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  roots: ['<rootDir>/ts'],
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
  transform: {
    '^.+\\.m?[t]sx?$': ['ts-jest', {
      useESM: true
    }],
  },
  watchPlugins: [
    'jest-watch-suspend',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    [
      'jest-watch-toggle-config', { 'setting': 'verbose' },
    ],
    [
      'jest-watch-toggle-config', { 'setting': 'collectCoverage' },
    ],
  ],
}

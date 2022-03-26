module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: {
        presets: [
          '@babel/preset-env'
        ]
      }
    }
  },
  roots: [
    '<rootDir>/ts',
  ],
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
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

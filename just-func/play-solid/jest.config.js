module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: {
        presets: [
          'babel-preset-solid',
          '@babel/preset-env'
        ]
      }
    }
  },
  moduleNameMapper: {
    'solid-js/web': '<rootDir>/node_modules/solid-js/web/dist/web.cjs',
    'solid-js': '<rootDir>/node_modules/solid-js/dist/solid.cjs',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    '<rootDir>/ts/**/*.[jt]s',
    '!<rootDir>/ts/bin.[jt]s'
  ],
  roots: [
    '<rootDir>/ts',
  ],
  testEnvironment: 'jsdom',
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

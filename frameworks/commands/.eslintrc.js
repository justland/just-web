const path = require('path')

module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true
  },
  extends: [
    'plugin:harmony/latest',
    'plugin:yml/standard'
  ],
  overrides: [
    {
      extends: [
        'plugin:harmony/ts-recommended-type-check'
      ],
      files: [
        '*.ts',
        '*.tsx'
      ],
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json')
      },
      rules: {
        '@typescript-eslint/require-await': 'off'
      }
    }
  ],
  root: true
}

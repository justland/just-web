const path = require('path')

module.exports = {
  env: {
    es6: true,
    jest: true
  },
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:harmony/latest',
    'plugin:yml/standard',
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
        project: path.resolve(__dirname, './tsconfig.lint.json')
      },
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/require-await': 'off',
      }
    },
    {
      extends: [
        'plugin:storybook/recommended'
      ],
      files: [
        '**/*.stories.*'
      ],
      rules: {
        'import/no-anonymous-default-export': 'off'
      }
    }
  ],
  root: true
}

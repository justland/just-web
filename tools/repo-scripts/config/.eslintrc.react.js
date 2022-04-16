module.exports = {
  'env': {
    'es6': true,
    'jest': true
  },
  'extends': [
    'react-app',
    'react-app/jest',
    'plugin:yml/standard',
  ],
  'overrides': [
    {
      extends: [
        'plugin:harmony/ts-recommended'
      ],
      files: [
        '*.ts',
        '*.tsx'
      ],
    },
    {
      extends: [
        'plugin:storybook/recommended'
      ],
      'files': [
        '**/*.stories.*'
      ],
      'rules': {
        'import/no-anonymous-default-export': 'off'
      }
    }
  ],
  'root': true
};

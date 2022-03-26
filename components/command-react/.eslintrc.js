module.exports = {
  'env': {
    'es6': true,
    'jest': true
  },
  'extends': [
    'react-app',
    'react-app/jest',
    'plugin:storybook/recommended',
    'plugin:harmony/ts-recommended',
    'plugin:yml/standard',
  ],
  'overrides': [
    {
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

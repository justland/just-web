module.exports = {
  'env': {
    'node': true,
    'es6': true,
    'jest': true
  },
  'extends': [
    'plugin:harmony/latest',
    'plugin:yml/standard'
  ],
  'overrides': [
    {
      'extends': [
        'plugin:harmony/ts-recommended'
      ],
      'files': [
        '*.ts',
        '*.tsx'
      ],
      rules: {
        '@typescript-eslint/require-await': 'off'
      }
    }
  ],
  'root': true
}

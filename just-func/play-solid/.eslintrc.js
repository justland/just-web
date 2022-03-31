module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true
  },
  extends: [
    'plugin:harmony/latest',
    'plugin:yml/standard',
  ],
  overrides: [
    {
      extends: [
        'plugin:harmony/ts-recommended'
      ],
      files: [
        '*.ts',
        '*.tsx'
      ]
    },
    {
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

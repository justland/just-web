module.exports = {
  'env': {
    'node': true,
    'es6': true,
    'jest': true
  },
  'extends': [
    'plugin:harmony/latest'
  ],
  'overrides': [
    {
      'extends': [
        'plugin:harmony/ts-recommended'
      ],
      'files': [
        '*.ts',
        '*.tsx'
      ]
    }
  ],
  'root': true
}

const base = require('./jest.config')

module.exports = {
  ...base,
  testEnvironment: 'node',
  testMatch: ['**/?*.(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
}

const base = require('./jest.config')

module.exports = {
	...base,
	testEnvironment: 'jsdom',
	testMatch: ['**/?*.(spec|test|integrate|accept|system|unit).[jt]s?(x)']
}

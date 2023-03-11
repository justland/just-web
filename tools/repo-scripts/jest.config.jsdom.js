const base = require('./jest.config.js')
module.exports = {
	...base,
	testEnvironment: 'jsdom'
}

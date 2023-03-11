const base = require('./config/jest.config')

module.exports = {
	...base,
	roots: ['<rootDir>/ts']
}

const { jsx } = require('@just-web/repo-scripts/config/eslint.js')
const path = require('path')

module.exports = jsx(path.resolve(__dirname, 'tsconfig.lint.json'))

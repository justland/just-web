const { library } = require('@just-web/repo-scripts/config/.eslint.js')
const path = require('path')

module.exports = {
  ...library(path.resolve(__dirname, 'tsconfig.json'))
}

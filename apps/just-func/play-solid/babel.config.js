const base = require('@just-web/repo-scripts/babel.config')

module.exports = {
  ...base,
  presets: [
    ...base.presets,
    'solid'
  ]
}

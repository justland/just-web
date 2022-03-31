module.exports = {
  jest(config) {
    const esModules = ['react-command-palette/dist/themes']
    esModules.forEach(m => config.moduleNameMapper[m] = 'identity-obj-proxy')
    config.watchPlugins = [
      'jest-watch-suspend',
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
      [
        'jest-watch-toggle-config', { 'setting': 'verbose' },
      ],
      [
        'jest-watch-toggle-config', { 'setting': 'collectCoverage' },
      ],
    ]
    return config
  }
}

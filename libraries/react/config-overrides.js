module.exports = {
  jest(config) {
    const esModules = ['@just-web/react-commands']
    esModules.forEach(m => config.moduleNameMapper[m] = 'identity-obj-proxy')
    // config.roots = ['<rootDir>/ts']
    config.testMatch = [
      '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
    ]
    config.coveragePathIgnorePatterns= [
      'dummyModule.tsx',
      '.*.stories.tsx'
    ]
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

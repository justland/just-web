/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  customTitle: '@just-web Documentation',
  customTitleLink: 'https://github.com/justland/just-web',
  entryPointStrategy: 'packages',
  entryPoints: [
    'frameworks/app',
    'frameworks/log',
    'frameworks/types',
    'libraries/states',
    'plugins/browser',
    'plugins/browser-keyboard',
    'plugins/browser-preferences',
    'plugins/commands',
    'plugins/events',
    'plugins/keyboard',
    'plugins/os',
    'plugins/preferences',
    'plugins/routes',
    'tools/testing',
  ],
  out: 'docs'
}

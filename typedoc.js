/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  customTitle: '@just-web Documentation',
  customTitleLink: 'https://github.com/justland/just-web',
  entryPointStrategy: 'packages',
  entryPoints: [
    'components/react-commands',
    'frameworks/app',
    'frameworks/log',
    'frameworks/types',
    'libraries/react',
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
    'tools/repo-scri',
    'tools/testing',
  ],
  out: 'docs'
}

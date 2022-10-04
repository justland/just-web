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
    'libraries/react',
    'libraries/states',
    'plugins/browser',
    'plugins/browser-contributions',
    'plugins/browser-preferences',
    'plugins/commands',
    'plugins/contributions',
    'plugins/eve',
    'plugins/os',
    'plugins/preferences',
    'plugins/routes',
    'tools/repo-scri',
    'tools/testing',
    'components/react-commands',
  ],
  out: 'docs'
}

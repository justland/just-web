export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('plugin', {
    description: 'Create a new plugin project',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'name of the project'
    }],
    actions: [{
      type: 'add',
      path: 'plugins/{{name}}/ts/index.spec.ts',
      templateFile: 'plops/plugins/ts/index.spec.ts.hbs'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/ts/index.ts',
      templateFile: 'plops/plugins/ts/index.ts.hbs'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/.editorconfig',
      templateFile: 'plops/plugins/.editorconfig'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/.eslintignore',
      templateFile: 'plops/plugins/.eslintignore'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/.eslintrc.js',
      templateFile: 'plops/plugins/.eslintrc.js'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/.gitignore',
      templateFile: 'plops/plugins/.gitignore'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/babel.config.js',
      templateFile: 'plops/plugins/babel.config.js'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/jest.config.js',
      templateFile: 'plops/plugins/jest.config.js'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/package.json',
      templateFile: 'plops/plugins/package.json.hbs'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/tsconfig.json',
      templateFile: 'plops/plugins/tsconfig.json'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/.depcheckrc.yml',
      templateFile: 'plops/plugins/.depcheckrc.yml'
    }]
  })
}

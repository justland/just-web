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
      templateFile: 'plop-templates/plugins/ts/index.spec.ts.hbs'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/ts/index.ts',
      templateFile: 'plop-templates/plugins/ts/index.ts.hbs'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/.editorconfig',
      templateFile: 'plop-templates/plugins/.editorconfig'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/.eslintignore',
      templateFile: 'plop-templates/plugins/.eslintignore'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/.eslintrc.js',
      templateFile: 'plop-templates/plugins/.eslintrc.js'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/.gitignore',
      templateFile: 'plop-templates/plugins/.gitignore'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/babel.config.js',
      templateFile: 'plop-templates/plugins/babel.config.js'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/jest.config.js',
      templateFile: 'plop-templates/plugins/jest.config.js'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/package.json',
      templateFile: 'plop-templates/plugins/package.json.hbs'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/tsconfig.json',
      templateFile: 'plop-templates/plugins/tsconfig.json'
    }, {
      type: 'add',
      path: 'plugins/{{name}}/.depcheckrc.yml',
      templateFile: 'plop-templates/plugins/.depcheckrc.yml'
    }]
  })
}

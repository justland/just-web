export default function (
	/** @type {import('plop').NodePlopAPI} */
	plop
) {
	plop.setGenerator('plugin', {
		description: 'Create a new plugin project',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'name of the project'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'plugins/{{name}}/ts/{{camelCase name}}Plugin.spec.ts',
				templateFile: 'plops/plugins/ts/plugin.spec.ts.hbs'
			},
			{
				type: 'add',
				path: 'plugins/{{name}}/ts/{{camelCase name}}Plugin.ts',
				templateFile: 'plops/plugins/ts/plugin.ts.hbs'
			},
			{
				type: 'add',
				path: 'plugins/{{name}}/ts/index.ts',
				templateFile: 'plops/plugins/ts/index.ts.hbs'
			},
			{
				type: 'add',
				path: 'plugins/{{name}}/.eslintignore',
				templateFile: 'plops/plugins/.eslintignore'
			},
			{
				type: 'add',
				path: 'plugins/{{name}}/.eslintrc.cjs',
				templateFile: 'plops/plugins/.eslintrc.cjs'
			},
			{
				type: 'add',
				path: 'plugins/{{name}}/.gitignore',
				templateFile: 'plops/plugins/.gitignore'
			},
			{
				type: 'add',
				path: 'plugins/{{name}}/.size-limit.json',
				templateFile: 'plops/plugins/.size-limit.json'
			},
			{
				type: 'add',
				path: 'plugins/{{name}}/LICENSE',
				templateFile: 'plops/plugins/LICENSE'
			},
			{
				type: 'add',
				path: 'plugins/{{name}}/package.json',
				templateFile: 'plops/plugins/package.json.hbs'
			},
			{
				type: 'add',
				path: 'plugins/{{name}}/README.md',
				templateFile: 'plops/plugins/README.md.hbs'
			},
			{
				type: 'add',
				path: 'plugins/{{name}}/tsconfig.json',
				templateFile: 'plops/plugins/tsconfig.json'
			},
			{
				type: 'add',
				path: 'plugins/{{name}}/tsconfig.cjs.json',
				templateFile: 'plops/plugins/tsconfig.cjs.json'
			}
		]
	})
}

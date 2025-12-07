/** @type {import('jest').Config} */
export default {
	preset: '@repobuddy/jest/presets/ts-watch',
	projects: ['jest.config.nodejs.mjs', 'jest.config.jsdom.mjs']
}

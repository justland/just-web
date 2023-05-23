import { justTestApp } from '@just-web/app/testing'
import { browserTestGizmoFn, stubStorage } from '@just-web/browser/testing'
import { browserI18nGizmoFn } from './index.js'
import { setLanguageCommand } from '@just-web/i18n'
import { commandsGizmoFn } from '@just-web/commands'
import { ctx } from './browser_i18n_gizmo.ctx.js'

it('can define the initial language', async () => {
	const app = await justTestApp()
		.with(browserTestGizmoFn())
		.with(browserI18nGizmoFn({ language: 'en' }))
		.create()

	expect(app.i18n.getLanguage()).toEqual('en')
})

it('can change the language', async () => {
	const app = await justTestApp()
		.with(browserTestGizmoFn())
		.with(browserI18nGizmoFn({ language: 'en' }))
		.create()

	app.i18n.setLanguage('fr')
	expect(app.i18n.getLanguage()).toEqual('fr')
})

it('can listen to language changes', async () => {
	expect.assertions(2)
	const app = await justTestApp()
		.with(
			browserTestGizmoFn({
				localStorage: stubStorage()
			})
		)
		.with(browserI18nGizmoFn({ language: 'en' }))
		.create()

	app.i18n.languageChanged((newLanguage, oldLanguage) => {
		expect(newLanguage).toEqual('fr')
		expect(oldLanguage).toEqual('en')
	})

	app.i18n.setLanguage('fr')
})

it('can reset the language', async () => {
	const app = await justTestApp()
		.with(
			browserTestGizmoFn({
				localStorage: stubStorage()
			})
		)
		.with(browserI18nGizmoFn({ language: 'en' }))
		.create()

	app.i18n.setLanguage('fr')
	app.i18n.clearLanguage()
	expect(app.i18n.getLanguage()).toEqual('en')
})

it('can use setLanguageCommand', async () => {
	expect.assertions(4)
	const app = await justTestApp()
		.with(commandsGizmoFn())
		.with(
			browserTestGizmoFn({
				localStorage: stubStorage()
			})
		)
		.with(browserI18nGizmoFn({ language: 'en' }))
		.create()
	app.i18n.languageChanged((newLanguage, oldLanguage) => {
		expect(newLanguage).toEqual('fr')
		expect(oldLanguage).toEqual('en')
	})
	setLanguageCommand('fr')
	expect(app.i18n.getLanguage()).toEqual('fr')
	expect(app.browser.localStorage.getItem(ctx.getStorageKey(app.name))).toEqual('fr')
})

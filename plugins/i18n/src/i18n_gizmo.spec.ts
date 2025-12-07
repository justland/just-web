import { justTestApp } from '@just-web/app/testing'
import { expect, it } from 'vitest'
import { i18nGizmoFn } from './index.js'

it('can define the initial language', async () => {
	const app = await justTestApp()
		.with(i18nGizmoFn({ language: 'en' }))
		.create()

	expect(app.i18n.getLanguage()).toEqual('en')
})

it('can change the language', async () => {
	const app = await justTestApp()
		.with(i18nGizmoFn({ language: 'en' }))
		.create()

	app.i18n.setLanguage('fr')
	expect(app.i18n.getLanguage()).toEqual('fr')
})

it('can listen to language changes', async () => {
	expect.assertions(2)
	const app = await justTestApp()
		.with(i18nGizmoFn({ language: 'en' }))
		.create()

	app.i18n.languageChanged((newLanguage, oldLanguage) => {
		expect(newLanguage).toEqual('fr')
		expect(oldLanguage).toEqual('en')
	})

	app.i18n.setLanguage('fr')
})

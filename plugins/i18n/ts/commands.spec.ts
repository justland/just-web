import { justTestApp } from '@just-web/app/testing'
import { commandsGizmoFn } from '@just-web/commands'
import { keyboardGizmoFn } from '@just-web/keyboard'
import { i18nGizmoFn, setLanguageCommand } from './index.js'

it('can invoke set language from command', async () => {
	const app = await justTestApp()
		.with(commandsGizmoFn())
		.with(keyboardGizmoFn())
		.with(i18nGizmoFn({ language: 'en' }))
		.create()

	app.i18n.languageChanged((newLanguage, oldLanguage) => {
		expect(newLanguage).toEqual('fr')
		expect(oldLanguage).toEqual('en')
	})

	setLanguageCommand('fr')
})

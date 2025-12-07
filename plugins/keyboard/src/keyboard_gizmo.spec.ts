import { justTestApp } from '@just-web/app/testing'
import { expect, it } from 'vitest'
import { keyboardGizmoFn } from './index.js'

it('can be created with no options', async () => {
	const app = await justTestApp().with(keyboardGizmoFn()).create()
	expect(app.keyboard.keyBindingContributions.keys()).toEqual([])
})

it('can be created with prefilled command contributions', async () => {
	const app = await justTestApp()
		.with(
			keyboardGizmoFn({
				keyBindingContributions: [{ id: 'some.command', key: 'ctrl+s' }]
			})
		)
		.create()
	expect(app.keyboard.keyBindingContributions.keys()).toEqual(['some.command'])
})

it('can registers key binding using just key', async () => {
	const app = await justTestApp().with(keyboardGizmoFn()).create()
	app.keyboard.keyBindingContributions.add({ id: 'some.command', key: 'ctrl+s' })
	expect(app.keyboard.keyBindingContributions.keys()).toEqual(['some.command'])
})

it('can registers mac only keybinding', async () => {
	const app = await justTestApp().with(keyboardGizmoFn()).create()
	app.keyboard.keyBindingContributions.add({ id: 'some.command', mac: 'cmd+s' })
	expect(app.keyboard.keyBindingContributions.keys()).toEqual(['some.command'])
})

it('can registers different keybindings for mac and windows', async () => {
	const app = await justTestApp().with(keyboardGizmoFn()).create()
	app.keyboard.keyBindingContributions.add({ id: 'some.command', key: 'ctrl+s', mac: 'cmd+s' })
	expect(app.keyboard.keyBindingContributions.keys()).toEqual(['some.command'])
})

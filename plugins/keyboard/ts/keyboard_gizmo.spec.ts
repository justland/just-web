import { justTestApp } from '@just-web/app/testing'
import { keyboardGizmoFn } from './keyboard_gizmo.js'

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

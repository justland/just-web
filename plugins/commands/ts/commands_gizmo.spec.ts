import { justTestApp } from '@just-web/app/testing'
import { keyboardGizmoFn } from '@just-web/keyboard'
import { a, some } from 'assertron'
import { commandsGizmoFn } from './commands_gizmo.js'

it('can be created without options', async () => {
	await justTestApp().with(commandsGizmoFn()).create()
})

it('provides showCommandPalette by default', async () => {
	const app = await justTestApp().with(commandsGizmoFn()).create()
	expect(app.commands.contributions.keys()).toEqual(['just-web.showCommandPalette'])
})

it('can be created with prefilled command contributions', async () => {
	const app = await justTestApp()
		.with(
			commandsGizmoFn({
				contributions: [{ id: 'some.command' }]
			})
		)
		.create()

	a.satisfies(app.commands.contributions.keys(), some('some.command'))
})

it('can be created with prefilled command handlers', async () => {
	const { commands, log } = await justTestApp()
		.with(
			commandsGizmoFn({
				handlers: {
					'some.command': function () {
						log.info('some.command')
					}
				}
			})
		)
		.create()

	commands.handlers.invoke('some.command')
	a.satisfies(log.reporter.getLogMessages(), some('some.command'))
})

it('registers showCommandPalette to keyboard', async () => {
	const { keyboard } = await justTestApp().with(keyboardGizmoFn()).with(commandsGizmoFn()).create()

	expect(keyboard.keyBindingContributions.keys()).toEqual(['just-web.showCommandPalette'])
})

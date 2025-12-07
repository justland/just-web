import { justTestApp } from '@just-web/app/testing'
import { a, some } from 'assertron'
import { it } from 'vitest'
import { commandsGizmoFn } from './commands_gizmo.js'

it('can be created without options', async () => {
	await justTestApp().with(commandsGizmoFn()).create()
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
					'some.command': () => {
						log.info('some.command')
					}
				}
			})
		)
		.create()

	commands.handlers.invoke('some.command')
	a.satisfies(log.reporter.getLogMessages(), some('some.command'))
})

it('can register command contributions', async () => {
	const app = await justTestApp().with(commandsGizmoFn()).create()
	app.commands.contributions.add({ id: 'some.command' })

	a.satisfies(app.commands.contributions.keys(), some('some.command'))
})

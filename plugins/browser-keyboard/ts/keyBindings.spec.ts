import { justTestApp } from '@just-web/app/testing'
import { type CommandContribution, commandsGizmoFn } from '@just-web/commands'
import { type KeyBindingContribution, keyboardGizmoFn } from '@just-web/keyboard'
import { osGizmo } from '@just-web/os'
import { a, has } from 'assertron'
import mousetrap from 'mousetrap'
import { startKeyBindings } from './keyBindings.js'

type StubCommand = KeyBindingContribution &
	CommandContribution & {
		handler(command: KeyBindingContribution & CommandContribution): void
	}

async function setupTest(...stubCommands: StubCommand[]) {
	const app = await justTestApp().with(keyboardGizmoFn()).with(commandsGizmoFn()).with(osGizmo).create()

	stubCommands.forEach(stubCommand => {
		app.commands.contributions.add(stubCommand)
		app.commands.handlers.register(stubCommand.id, () => stubCommand.handler(stubCommand))
		app.keyboard.keyBindingContributions.add(stubCommand)
	})
	return app
}

beforeEach(() => {
	mousetrap.reset()
})

test('trigger command', async () => {
	const invoked: string[] = []
	const app = await setupTest({
		id: 'just-test.showJob',
		description: 'show job',
		key: 'ctrl+j',
		handler(cmd) {
			invoked.push(cmd.description!)
		}
	})
	startKeyBindings(app)

	mousetrap.trigger('ctrl+j')
	expect(invoked).toEqual(['show job'])
})

test('trigger cmd command', async () => {
	const invoked: string[] = []
	const app = await setupTest({
		id: 'just-test.showJob',
		description: 'show job',
		key: 'cmd+j',
		handler(cmd) {
			invoked.push(cmd.description!)
		}
	})
	startKeyBindings(app)

	// mousetrap takes `command+` instead of `cmd+`
	mousetrap.trigger('command+j')
	expect(invoked).toEqual(['show job'])
})

test('emit warning for duplicate key binding', async () => {
	const app = await setupTest(
		{
			id: 'just-test.showJob',
			description: 'show job',
			key: 'ctrl+j',
			handler() {}
		},
		{
			id: 'just-test.diffJob',
			description: 'another command',
			key: 'ctrl+j',
			handler() {}
		}
	)
	startKeyBindings(app)

	a.satisfies(
		app.log.reporter.getLogMessagesWithLevel(),
		has('(WARN) Registering a duplicate key binding, ignored: just-test.diffJob - ctrl+j')
	)
})

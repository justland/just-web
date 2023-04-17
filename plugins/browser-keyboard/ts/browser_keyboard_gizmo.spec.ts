import { command } from '@just-web/commands'
import { a, some } from 'assertron'
import mousetrap from 'mousetrap'
import { browserKeyboardGizmoTestApp } from './testing/index.js'
beforeEach(() => mousetrap.reset())

it('triggers command by keyboard event', async () => {
	const showJob = command(
		{
			id: 'just-test.showJob',
			description: 'show job',
			key: 'ctrl+j'
		},
		() => expect('invoked').toEqual('invoked')
	)

	const app = await browserKeyboardGizmoTestApp()
	showJob.connect(app)

	expect.assertions(1)
	mousetrap.trigger('ctrl+j')
})

it('triggers command by keyboard event with cmd key', async () => {
	const showJob = command(
		{
			id: 'just-test.showJob',
			description: 'show job',
			key: 'cmd+j'
		},
		() => expect('invoked').toEqual('invoked')
	)

	const app = await browserKeyboardGizmoTestApp()
	showJob.connect(app)

	expect.assertions(1)

	// mousetrap takes `command+` instead of `cmd+`
	mousetrap.trigger('command+j')
})

it('emits warning for duplicate key binding', async () => {
	const showJob = command(
		{
			id: 'just-test.showJob',
			description: 'show job',
			key: 'ctrl+j'
		},
		() => expect('invoked').toEqual('invoked')
	)
	const diffJob = command(
		{
			id: 'just-test.diffJob',
			description: 'diff job',
			key: 'ctrl+j'
		},
		() => expect('invoked').toEqual('invoked')
	)

	const app = await browserKeyboardGizmoTestApp()
	showJob.connect(app)
	diffJob.connect(app)

	a.satisfies(
		app.log.reporter.getLogMessagesWithIdAndLevel(),
		some(
			'test:@just-web/browser-keyboard (WARN) Registering a duplicate key binding, ignored: just-test.diffJob - ctrl+j'
		)
	)
})

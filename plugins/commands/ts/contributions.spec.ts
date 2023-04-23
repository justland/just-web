import { justTestApp } from '@just-web/app/testing'
import { a, some } from 'assertron'
import { contributionRegistry } from './contributions.js'
import { formatCommand, type CommandContribution } from './index.js'

async function setupTest(options?: CommandContribution[]) {
	const app = await justTestApp().create()
	return [contributionRegistry(app, options), app.log] as const
}

it('creates as empty registory', async () => {
	const [r] = await setupTest()
	expect(r.keys()).toEqual([])
})

it('creates with prefilled command contributions', async () => {
	const [r] = await setupTest([{ id: 'some.command' }])
	expect(r.keys()).toEqual(['some.command'])
})

describe('add()', () => {
	it('adds a new command', async () => {
		const [store] = await setupTest()
		const cmd = { id: 'a', description: 'a' }
		store.add(cmd)
		const a = store.get()['a']

		expect(a).toBe(cmd)
	})
	it('logs an error and ignore if a command with the name ID already exist', async () => {
		const [store, log] = await setupTest()
		const cmd1 = { id: 'a', description: 'a' }
		const cmd2 = { id: 'a', description: 'a' }
		store.add(cmd1)
		store.add(cmd2)

		a.satisfies(
			log.reporter.getLogMessagesWithLevel(),
			some('(ERROR) Registering a duplicate command contribution, ignored: a')
		)

		const value = store.get()['a']
		expect(value).toBe(cmd1)
	})

	it('adds multiple commands', async () => {
		const [store] = await setupTest()
		const cmd1 = { id: 'a', description: 'a' }
		const cmd2 = { id: 'b', description: 'b' }
		store.add(cmd1, cmd2)

		expect(Object.keys(store.get()).length).toBe(2)
	})
})

describe('formatCommand()', () => {
	const allDefinedCommand = {
		id: 'app.someCommand',
		title: 'Sing a song',
		description: 'Jingle Bell'
	}
	test('use defined name', () => {
		const a = formatCommand(allDefinedCommand)

		expect(a).toEqual({
			id: 'app.someCommand',
			title: 'Sing a song',
			description: 'Jingle Bell'
		})
	})

	test('create name from command as sentence case, skipping first category', () => {
		const a = formatCommand({ id: 'app.miku.singASong' })

		expect(a).toEqual({
			id: 'app.miku.singASong',
			title: 'Miku sing a song',
			description: undefined
		})
	})
})

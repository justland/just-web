import { justTestApp } from '@just-web/app/testing'
import { a, some } from 'assertron'
import { formatKeyBinding, keyBindingRegistry } from './index.js'

async function setupTest(options?: keyBindingRegistry.Options) {
	const app = await justTestApp().create()
	return [keyBindingRegistry(app, options), app.log] as const
}

it('creates as empty registory', async () => {
	const [r] = await setupTest()
	expect(r.keys()).toEqual([])
})

it('creates with prefilled command contributions', async () => {
	const [r] = await setupTest([{ id: 'some.command', key: 'ctrl+s' }])
	expect(r.keys()).toEqual(['some.command'])
})

describe('add()', () => {
	it('adds a new command', async () => {
		const [store] = await setupTest()
		const cmd = { id: 'a', key: 'ctrl+s' }
		store.add(cmd)
		const a = store.get()['a']

		expect(a).toBe(cmd)
	})
	it('logs an error and ignore if a command with the name ID already exist', async () => {
		const [store, log] = await setupTest()
		const cmd1 = { id: 'a', key: 'ctrl+s' }
		const cmd2 = { id: 'a', key: 'ctrl+s' }
		store.add(cmd1)
		store.add(cmd2)

		a.satisfies(
			log.reporter.getLogMessagesWithIdAndLevel(),
			some('test:@just-web/contributions (WARN) Registering a duplicate key binding contribution, ignored: a')
		)

		const r = store.get()['a']
		expect(r).toBe(cmd1)
	})

	it('adds multiple commands', async () => {
		const [store] = await setupTest()
		const cmd1 = { id: 'a', key: 'ctrl+s' }
		const cmd2 = { id: 'b', key: 'ctrl+b' }
		store.add(cmd1, cmd2)

		expect(Object.keys(store.get()).length).toBe(2)
	})
})

describe('formatKeyBinding()', () => {
	test(`in mac returns 'mac' key if defined`, () => {
		const a = formatKeyBinding({ os: { isMac: () => true } }, { id: 'someCommand', mac: 'cmd+p' })
		expect(a).toEqual({
			id: 'someCommand',
			key: 'cmd+p'
		})
	})
	test(`in mac returns 'key' if 'mac' not defined`, () => {
		const a = formatKeyBinding({ os: { isMac: () => true } }, { id: 'someCommand', key: 'ctrl+p' })
		expect(a).toEqual({
			id: 'someCommand',
			key: 'ctrl+p'
		})
	})
	test(`not in mac returns 'key'`, () => {
		const a = formatKeyBinding(
			{ os: { isMac: () => false } },
			{
				id: 'someCommand',
				mac: 'cmd+p',
				key: 'ctrl+p'
			}
		)
		expect(a).toEqual({
			id: 'someCommand',
			key: 'ctrl+p'
		})
	})
})

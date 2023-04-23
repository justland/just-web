import { jest } from '@jest/globals'
import { justTestApp } from '@just-web/app/testing'
import { a, has } from 'assertron'
import { handlerRegistry } from './handlers.js'

async function setupTest(options?: handlerRegistry.Options) {
	const app = await justTestApp().create()
	return [handlerRegistry(app, options), app.log] as const
}

it('creates as an empty registry', async () => {
	const app = await justTestApp().create()
	const r = handlerRegistry(app)
	expect(r.keys()).toEqual([])
})

it('creates with default commands', async () => {
	const app = await justTestApp().create()
	const log = app.log.getLogger('test')
	const r = handlerRegistry(app, {
		a: () => log.info('exec a')
	})
	expect(r.keys()).toEqual(['a'])
	r.invoke('a')
	a.satisfies(app.log.reporter.getLogMessages(), has('exec a'))
})

describe('register()', () => {
	it('registers a new command', async () => {
		const [r] = await setupTest()

		r.register('some.Command', () => {})

		expect(r.keys()).toEqual(['some.Command'])
	})

	it('emits a warning if registering a command with existing id', async () => {
		const [r, log] = await setupTest()
		r.register('just-web.showCommandPalette', () => {})
		r.register('just-web.showCommandPalette', () => {})
		a.satisfies(
			log.reporter.getLogMessagesWithLevel(),
			has(
				`(NOTICE) Registering a new handler for 'just-web.showCommandPalette'. Please make sure this is expected.`,
				`(DEBUG) overrideing handler: () => {}`
			)
		)
	})

	it('can register a command taking params', async () => {
		const [r] = await setupTest()
		let actual: string
		r.register('just-web.editFile', (file: string) => (actual = `editing ${file}`))
		r.invoke('just-web.editFile', 'abc.txt')
		expect(actual!).toEqual('editing abc.txt')
	})
})

describe('keys()', () => {
	test('empty to begin with', async () => {
		const [r] = await setupTest()
		const cmds = r.keys()
		expect(cmds.length).toBe(0)
	})

	test('get registered commands', async () => {
		const [r] = await setupTest()
		r.register('cmd1', () => {})
		r.register('cmd2', () => {})
		const cmds = r.keys()
		expect(cmds).toEqual(['cmd1', 'cmd2'])
	})
})

describe('invoke()', () => {
	test('invoke not registered command emits an error', async () => {
		const [r, log] = await setupTest()
		r.invoke('not-exist')

		a.satisfies(
			log.reporter.getLogMessagesWithLevel(),
			has(`(ERROR) Invoking not registered command: 'not-exist'`)
		)
	})

	test('invoke command', async () => {
		const fn = jest.fn()
		const [r] = await setupTest()
		r.register('command1', fn)
		r.invoke('command1')
		expect(fn).toHaveBeenCalledTimes(1)
	})

	it('can invoke command with arguments', async () => {
		const fn = jest.fn()
		const [r] = await setupTest()
		r.register('command1', fn)
		r.invoke('command1', 1)
		expect(fn).toHaveBeenCalledWith(1)
	})

	it('receives the return value from the handler', async () => {
		const [r] = await setupTest()
		r.register('c1', () => ({ a: 1 }))
		const a = r.invoke('c1')
		expect(a).toEqual({ a: 1 })
	})
})

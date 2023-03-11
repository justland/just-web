import { jest } from '@jest/globals'
import { logTestPlugin } from '@just-web/log'
import { logEqual } from '@just-web/testing'
import { handlerRegistry } from './handlers.js'

function setupTest(options?: handlerRegistry.Options) {
	const [logctx] = logTestPlugin().init()
	return [handlerRegistry(logctx, options), logctx.log] as const
}

it('creates as an empty registry', () => {
	const [logctx] = logTestPlugin().init()
	const r = handlerRegistry(logctx)
	expect(r.keys()).toEqual([])
})

it('creates with default commands', () => {
	const [logctx] = logTestPlugin().init()
	const log = logctx.log.getLogger('test')
	const r = handlerRegistry(logctx, {
		a: () => log.info('exec a')
	})
	expect(r.keys()).toEqual(['a'])
	r.invoke('a')
	expect(logctx.log.reporter.getLogMessages()).toEqual(['exec a'])
})

describe('register()', () => {
	it('registers a new command', () => {
		const [r] = setupTest()

		r.register('some.Command', () => {})

		expect(r.keys()).toEqual(['some.Command'])
	})

	it('emits a warning if registering a command with existing id', () => {
		const [r, log] = setupTest()
		r.register('just-web.showCommandPalette', () => {})
		r.register('just-web.showCommandPalette', () => {})
		logEqual(
			log.reporter,
			`(NOTICE) Registring a new handler for 'just-web.showCommandPalette'. Please make sure this is expected.`,
			`(DEBUG) overrideing handler: () => {}`
		)
	})

	it('can register a command taking params', () => {
		const [r] = setupTest()
		let actual: string
		r.register('just-web.editFile', (file: string) => (actual = `editing ${file}`))
		r.invoke('just-web.editFile', 'abc.txt')
		expect(actual!).toEqual('editing abc.txt')
	})
})

describe('keys()', () => {
	test('empty to begin with', () => {
		const [r] = setupTest()
		const cmds = r.keys()
		expect(cmds.length).toBe(0)
	})

	test('get registered commands', () => {
		const [r] = setupTest()
		r.register('cmd1', () => {})
		r.register('cmd2', () => {})
		const cmds = r.keys()
		expect(cmds).toEqual(['cmd1', 'cmd2'])
	})
})

describe('invoke()', () => {
	test('invoke not registered command emits an error', () => {
		const [r, log] = setupTest()
		r.invoke('not-exist')

		logEqual(log.reporter, `(ERROR) Invoking not registered command: 'not-exist'`)
	})

	test('invoke command', () => {
		const fn = jest.fn()
		const [r] = setupTest()
		r.register('command1', fn)
		r.invoke('command1')
		expect(fn).toHaveBeenCalledTimes(1)
	})

	it('can invoke command with arguments', () => {
		const fn = jest.fn()
		const [r] = setupTest()
		r.register('command1', fn)
		r.invoke('command1', 1)
		expect(fn).toHaveBeenCalledWith(1)
	})

	it('receives the return value from the handler', () => {
		const [r] = setupTest()
		r.register('c1', () => ({ a: 1 }))
		const a = r.invoke('c1')
		expect(a).toEqual({ a: 1 })
	})
})

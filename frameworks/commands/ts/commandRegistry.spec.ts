import logPlugin from '@just-web/log'
import { logEqual } from '@just-web/testing'
import { commandRegistry } from './commandRegistry'

async function setupTest(options?: commandRegistry.Options) {
  const [logctx] = await logPlugin.initForTest()
  return [commandRegistry(logctx, options), logctx.log] as const
}

it('creates as an empty registry', async () => {
  const [logctx] = await logPlugin.initForTest()
  const r = commandRegistry(logctx)
  expect(r.keys()).toEqual([])
})

it('creates with default commands', async () => {
  const [logctx] = await logPlugin.initForTest()
  const log = logctx.log.getLogger('test')
  const r = commandRegistry(logctx, {
    a: () => log.info('exec a')
  })
  expect(r.keys()).toEqual(['a'])
  r.invoke('a')
  expect(logctx.log.reporter.getLogMessages()).toEqual(['exec a'])
})

describe('register()', () => {
  it('registers a new command', async () => {
    const [r] = await setupTest()

    r.register('some.Command', () => { })

    expect(r.keys()).toEqual(['some.Command'])
  })

  it('emits a warning if registering a command with existing id', async () => {
    const [r, log] = await setupTest()
    r.register('just-web.showCommandPalette', () => { })
    r.register('just-web.showCommandPalette', () => { })
    logEqual(log.reporter, `(WARN) Registering a duplicate command, ignored: just-web.showCommandPalette`)
  })

  it('can register a command taking params', async () => {
    const [r] = await setupTest()
    let actual: string
    r.register('just-web.editFile', (file: string) => actual = `editing ${file}`)
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
    r.register('cmd1', () => { })
    r.register('cmd2', () => { })
    const cmds = r.keys()
    expect(cmds).toEqual(['cmd1', 'cmd2'])
  })
})

describe('invoke()', () => {
  test('invoke not registered command emits an error', async () => {
    const [r, log] = await setupTest()
    r.invoke('not-exist')

    logEqual(log.reporter, `(ERROR) Invoking not registered command: 'not-exist'`)
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
})

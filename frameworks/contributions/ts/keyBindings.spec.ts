import logPlugin from '@just-web/log'
import { logEqual } from '@just-web/testing'
import { formatKeyBinding, keyBindingRegistry } from '.'
import { ctx } from './keyBinding.ctx'

function setupTest(options?: keyBindingRegistry.Options) {
  const [logctx] = logPlugin.initForTest()
  return [keyBindingRegistry(logctx, options), logctx.log] as const
}

it('creates as empty registory', () => {
  const [r] = setupTest()
  expect(r.keys()).toEqual([])
})

it('creates with prefilled command contributions', () => {
  const [r] = setupTest([{ command: 'some.command', key: 'ctrl+s' }])
  expect(r.keys()).toEqual(['some.command'])
})

describe('add()', () => {
  it('adds a new command', () => {
    const [store] = setupTest()
    const cmd = { command: 'a', key: 'ctrl+s' }
    store.add(cmd)
    const a = store.get()['a']

    expect(a).toBe(cmd)
  })
  it('logs an error and ignore if a command with the name ID already exist', () => {
    const [store, log] = setupTest()
    const cmd1 = { command: 'a', key: 'ctrl+s' }
    const cmd2 = { command: 'a', key: 'ctrl+s' }
    store.add(cmd1)
    store.add(cmd2)

    logEqual(log.reporter, '(WARN) Registering a duplicate key binding contribution, ignored: a')

    const a = store.get()['a']
    expect(a).toBe(cmd1)
  })

  it('adds multiple commands', () => {
    const [store] = setupTest()
    const cmd1 = { command: 'a', key: 'ctrl+s' }
    const cmd2 = { command: 'b', key: 'ctrl+b' }
    store.add(cmd1, cmd2)

    expect(Object.keys(store.get()).length).toBe(2)
  })
})

describe('formatKeyBinding()', () => {
  test(`in mac returns 'mac' key if defined`, () => {
    ctx.isMac = () => true
    const a = formatKeyBinding({ command: 'someCommand', mac: 'cmd+p' })
    expect(a).toEqual({
      command: 'someCommand',
      key: 'cmd+p'
    })
  })
  test(`in mac returns 'key' if 'mac' not defined`, () => {
    ctx.isMac = () => true
    const a = formatKeyBinding({ command: 'someCommand', key: 'ctrl+p' })
    expect(a).toEqual({
      command: 'someCommand',
      key: 'ctrl+p'
    })
  })
  test(`not in mac returns 'key'`, () => {
    ctx.isMac = () => false
    const a = formatKeyBinding({
      command: 'someCommand',
      mac: 'cmd+p',
      key: 'ctrl+p'
    })
    expect(a).toEqual({
      command: 'someCommand',
      key: 'ctrl+p'
    })
  })
})

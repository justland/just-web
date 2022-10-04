import commandsPlugin from '@just-web/commands'
import contributionsPlugin from '@just-web/contributions'
import { logTestPlugin } from '@just-web/log'
import preferencesPlugin, { clearUserPreference, clearUserPreferences, getUserPreference, setUserPreference } from '@just-web/preferences'
import { a, AssertOrder } from 'assertron'
import { hasAll } from 'satisfier'
import plugin from '.'
import { ctx } from './index.ctx'

afterEach(() => ctx.localStorage = localStorage)

describe('plugin.init()', () => {
  it('regiser commands', () => {
    const { commands } = setupPlugin()

    a.satisfies(commands.keys(), hasAll(
      getUserPreference.type,
      setUserPreference.type,
      clearUserPreference.type,
      clearUserPreferences.type
    ))
  })
})

function setupPlugin() {
  const name = 'test-app'
  const id = 'some-id'

  const [{ log }] = logTestPlugin().init()
  const [{ contributions }] = contributionsPlugin().init({ log })
  const [{ commands }] = commandsPlugin().init({ log, contributions })
  const [{ preferences }] = preferencesPlugin().init({ log, commands, contributions })
  plugin().init({ name, id, log, commands })
  return { name, id, log, contributions, commands, preferences }
}

describe('setUserPreference()', () => {
  it('uses set to save', () => {
    const { preferences } = setupPlugin()
    preferences.set('key-a', 'hello-world')
    expect(preferences.get('key-a')).toEqual('hello-world')
  })

  it('save with key prefixed with app name, so that preferences will be be overwritten in micro front end scenario', () => {
    const { preferences } = setupPlugin()
    const o = new AssertOrder(1)
    ctx.localStorage = {
      ...ctx.localStorage,
      setItem: (key) => {
        o.once(1)
        expect(key).toEqual('test-app:my-key')
      }
    }
    preferences.set('my-key', 'hello')
    o.end()
  })

  it('save value encoded', () => {
    const { preferences } = setupPlugin()
    const o = new AssertOrder(1)
    ctx.localStorage = {
      ...ctx.localStorage,
      setItem: (_, value) => {
        o.once(1)
        expect(value).not.toEqual('hello')
      }
    }
    preferences.set('my-key', 'hello')
    o.end()
  })
})

describe('clearUserPreference()', () => {
  it('clear not set value is ok', () => {
    const { preferences } = setupPlugin()
    preferences.clear('unknown') // do not throw
  })

  it('clear updated value', () => {
    const { preferences } = setupPlugin()
    preferences.set('x', '123')
    preferences.clear('x')
    expect(preferences.get('x')).toBeUndefined()
  })
})

describe('clearUserPreferences()', () => {
  it('only clear preference for the current app', () => {
    const { preferences } = setupPlugin()
    preferences.set('x', '123')
    preferences.set('y', 'abc')

    ctx.localStorage.setItem('someone-else-value', 'hello')
    preferences.clearAll()
    expect(preferences.get('x')).toBeUndefined()
    expect(preferences.get('y')).toBeUndefined()
    expect(ctx.localStorage.getItem('someone-else-value')).toEqual('hello')
  })
})

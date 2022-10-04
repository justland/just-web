import { createTestApp } from '@just-web/app'
import commandsPlugin from '@just-web/commands'
import contributionsPlugin from '@just-web/contributions'
import { logLevels } from '@just-web/log'
import preferencesPlugin, { clearUserPreference, clearUserPreferences, getUserPreference, setUserPreference } from '@just-web/preferences'
import { a, AssertOrder } from 'assertron'
import { hasAll, some } from 'satisfier'
import { isType } from 'type-plus'
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
  const app = createTestApp({ log: { logLevel: logLevels.info } })
    .extend(contributionsPlugin())
    .extend(commandsPlugin())
    .extend(preferencesPlugin())
    .extend(plugin())
  return app
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

  it('is being tracked', () => {
    const { preferences, log } = setupPlugin()
    preferences.set('key-a', 'hello-world')

    a.satisfies(log.reporter.getLogMessagesWithIdAndLevel(), some(
      "test-app:@just-web/browser-preferences (INFO) set: 'test-app:key-a' hello-world"
    ))
  })
})

describe('updateUserPreference()', () => {
  it('requires the handler to return a string', () => {
    const { preferences } = setupPlugin()

    isType.equal<true, string, ReturnType<Parameters<typeof preferences.update>[1]>>()
  })
  it('passes the original value to the handler', () => {
    const { preferences } = setupPlugin()
    preferences.set('update-a', 'hello')
    preferences.update('update-a', (v) => v + ' world')

    expect(preferences.get('update-a')).toEqual('hello world')
  })

  it('is being tracked', () => {
    const { preferences, log } = setupPlugin()
    preferences.set('update-a', 'hello')
    preferences.update('update-a', (v) => v + ' world')

    console.info(log.reporter.getLogMessagesWithIdAndLevel())
    a.satisfies(log.reporter.getLogMessagesWithIdAndLevel(), some(
      "test-app:@just-web/browser-preferences (INFO) update: 'test-app:update-a' hello -> hello world"
    ))
  })
})

describe('clearUserPreference()', () => {
  it('clear not set value is ok', () => {
    const { preferences, log } = setupPlugin()
    preferences.clear('unknown') // do not throw

    a.satisfies(log.reporter.getLogMessagesWithIdAndLevel(), some(
      `test-app:@just-web/browser-preferences (INFO) clear: 'test-app:unknown'`
    ))
  })

  it('clear existing value', () => {
    const { preferences } = setupPlugin()
    preferences.set('x', '123')
    preferences.clear('x')
    expect(preferences.get('x')).toBeUndefined()
  })
})

describe('clearUserPreferences()', () => {
  it('only clear preference for the current app', () => {
    const { preferences, log } = setupPlugin()
    preferences.set('x', '123')
    preferences.set('y', 'abc')

    ctx.localStorage.setItem('someone-else-value', 'hello')
    preferences.clearAll()
    expect(preferences.get('x')).toBeUndefined()
    expect(preferences.get('y')).toBeUndefined()
    expect(ctx.localStorage.getItem('someone-else-value')).toEqual('hello')

    a.satisfies(log.reporter.getLogMessagesWithIdAndLevel(), some(
      `test-app:@just-web/browser-preferences (INFO) clear all: 'test-app'`
    ))
  })
})

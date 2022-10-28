import { createTestApp } from '@just-web/app'
import commandsPlugin from '@just-web/commands'
import keyboardPlugin from '@just-web/keyboard'
import { logLevels } from '@just-web/log'
import preferencesPlugin, { clearAllUserPreferences } from '@just-web/preferences'
import { a, AssertOrder } from 'assertron'
import { hasAll, some } from 'satisfier'
import browserPreferencePlugin from '.'
import { ctx } from './index.ctx'

afterEach(() => ctx.localStorage = localStorage)

describe('browserPreferencePlugin.init()', () => {
  it('register just-web.clearAllUserPreferences contribution', () => {
    const { commands } = setupTestApp()

    a.satisfies(commands.contributions.keys(), hasAll(
      clearAllUserPreferences.id
    ))
  })
})

describe(`app.preferences.get()`, () => {
  it('gets undefined if not exist', () => {
    const { preferences } = setupTestApp()
    const result = preferences.get('not-exist')
    expect(result).toBeUndefined()
  })

  it('can specify a default value (which is not saved to the store)', () => {
    const { preferences } = setupTestApp()
    stubStorage({
      setItem() { fail('should not reach') }
    })
    const result = preferences.get('some-key', 'abc')
    expect(result).toEqual('abc')
  })
})

describe('app.preferences.set()', () => {
  it('uses set to save', () => {
    const { preferences } = setupTestApp()
    preferences.set('key-a', 'hello-world')
    expect(preferences.get('key-a')).toEqual('hello-world')
  })

  it('save with key prefixed with app name, so that preferences are unique across micro front end apps', () => {
    const { preferences } = setupTestApp()
    const o = new AssertOrder(1)
    stubStorage({
      setItem(key) {
        o.once(1)
        expect(key).toEqual('test-app:my-key')
      }
    })
    preferences.set('my-key', 'hello')
    o.end()
  })


  it('encode the value when save to the store', () => {
    const { preferences } = setupTestApp()
    const o = new AssertOrder(1)
    stubStorage({
      setItem: (_, value) => {
        o.once(1)
        expect(value).not.toEqual('hello')
      }
    })
    preferences.set('my-key', 'hello')
    o.end()
  })

  it('emits a trace log', () => {
    const { preferences, log } = setupTestApp({ log: { logLevel: logLevels.all } })
    preferences.set('emit-trace-log', 'hello-world')

    const messages = log.reporter.getLogMessagesWithIdAndLevel()
    a.satisfies(messages, some(
      "test-app:@just-web/browser-preferences (TRACE) set: 'test-app:emit-trace-log' undefined -> hello-world"
    ))
  })

  it('clear the value if set to undefined', () => {
    const { preferences } = setupTestApp()
    const o = new AssertOrder(1)
    stubStorage({
      removeItem(key) {
        o.once(1)
        expect(key).toEqual('test-app:key-to-clear')
      }
    })

    preferences.set('key-to-clear', undefined)
    o.end()
  })

  it('accepts a handler', () => {
    const { preferences, log } = setupTestApp({ log: { logLevel: logLevels.all } })
    preferences.set('accept-handler', v => {
      expect(v).toBeUndefined()
      return '1'
    })
    preferences.set('accept-handler', v => {
      expect(v).toEqual('1')
      return '2'
    })

    expect(preferences.get('accept-handler')).toEqual('2')
    preferences.set('accept-handler', () => undefined)
    expect(preferences.get('accept-handler')).toBeUndefined()

    const messages = log.reporter.getLogMessagesWithIdAndLevel()
    a.satisfies(messages, hasAll(
      "test-app:@just-web/browser-preferences (TRACE) set: 'test-app:accept-handler' undefined -> 1",
      "test-app:@just-web/browser-preferences (TRACE) set: 'test-app:accept-handler' 1 -> 2",
      "test-app:@just-web/browser-preferences (TRACE) set: clear 'test-app:accept-handler'",
    ))
  })

  it('clear not set value is ok', () => {
    const { preferences, log } = setupTestApp({ log: { logLevel: logLevels.all } })
    preferences.set('unknown', undefined) // do not throw

    a.satisfies(log.reporter.getLogMessagesWithIdAndLevel(), some(
      `test-app:@just-web/browser-preferences (TRACE) set: clear 'test-app:unknown'`
    ))
  })
})

describe('app.preferences.clearAll()', () => {
  it('only clear preference for the current app', () => {
    const { preferences, log } = setupTestApp()
    preferences.set('x', '123')
    preferences.set('y', 'abc')

    ctx.localStorage.setItem('someone-else-value', 'hello')
    preferences.clearAll()
    expect(preferences.get('x')).toBeUndefined()
    expect(preferences.get('y')).toBeUndefined()
    expect(ctx.localStorage.getItem('someone-else-value')).toEqual('hello')

    a.satisfies(log.reporter.getLogMessagesWithIdAndLevel(), some(
      `test-app:@just-web/browser-preferences (NOTICE) clear all: 'test-app'`
    ))
  })
})

function setupTestApp(options: createTestApp.Options = { log: { logLevel: logLevels.info } }) {
  return createTestApp(options)
    .extend(keyboardPlugin())
    .extend(commandsPlugin())
    .extend(preferencesPlugin())
    .extend(browserPreferencePlugin())
}

function stubStorage(stub: Partial<Storage>) {
  ctx.localStorage = new Proxy(ctx.localStorage, {
    get(target, p: any) {
      return stub[p] ? stub[p] : target[p]
    }
  })
}

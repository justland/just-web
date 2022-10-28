import { createTestApp } from '@just-web/app'
import commandsPlugin from '@just-web/commands'
import keyboardPlugin from '@just-web/keyboard'
import { AssertOrder } from 'assertron'
import { record } from 'type-plus'
import preferencesPlugin, { clearAllUserPreferences, getUserPreference, setUserPreference } from '.'

function setupTestApp() {
  return createTestApp()
    .extend(keyboardPlugin())
    .extend(commandsPlugin())
    .extend(preferencesPlugin())
}
describe(`plugin.init()`, () => {
  it('provides getUserPreference() API', () => {
    const app = setupTestApp()
    const o = new AssertOrder(1)
    app.commands.handlers.register(
      getUserPreference.id,
      getUserPreference.defineHandler(key => {
        expect(key).toEqual('some-unique-id')
        o.once(1)
        return '{ a: 1 }'
      })
    )

    expect(app.preferences.get('some-unique-id')).toEqual('{ a: 1 }')

    o.end()
  })

  it('provides setUserPreference() API', () => {
    const app = setupTestApp()
    const o = new AssertOrder(1)
    app.commands.handlers.register(
      setUserPreference.id,
      setUserPreference.defineHandler((key, value) => {
        expect(key).toEqual('some-unique-id')
        expect(value).toEqual('{ a: 1 }')
        o.once(1)
      })
    )

    app.preferences.set('some-unique-id', '{ a: 1 }')

    o.end()
  })

  it('provides clearAllUserPreferences() API', () => {
    const app = setupTestApp()

    const o = new AssertOrder(1)
    app.commands.handlers.register(
      clearAllUserPreferences.id,
      clearAllUserPreferences.defineHandler(() => o.once(1))
    )

    app.preferences.clearAll()

    o.end()
  })
})


describe(`${getUserPreference.name}()`, () => {
  it('can specify a default value', () => {
    setupTestApp()
    const result = getUserPreference('new-key', 'abc')
    expect(result).toEqual(result)
  })
})

describe(`${setUserPreference.name}()`, () => {
  it('supports passing in handler', () => {
    const app = setupTestApp()
    const store = record<string, string | undefined>()

    app.commands.handlers.register(
      setUserPreference.id,
      setUserPreference.defineHandler((key, value) => {
        const v = typeof value === 'function' ? value(store[key]) : value
        store[key] = v
      })
    )
    app.commands.handlers.register(
      getUserPreference.id,
      getUserPreference.defineHandler(key => store[key])
    )

    app.preferences.set('some-unique-id', (value) => value ? (value + 1) : 's')
    app.preferences.set('some-unique-id', (value) => value ? (value + 1) : 's')

    expect(store['some-unique-id']).toEqual('s1')
  })

  it('can accept undefined as value (which the implementation should remove the preference)', () => {
    setUserPreference('somekey', undefined)
  })

  it('can receive undefined from the handler (which the implementation should remove the preference)', () => {
    setUserPreference('somekey', () => undefined)
  })
})

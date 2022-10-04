import { createTestApp } from '@just-web/app'
import commandsPlugin from '@just-web/commands'
import contributionsPlugin from '@just-web/contributions'
import { AssertOrder } from 'assertron'
import { record } from 'type-plus'
import plugin, { clearUserPreference, clearUserPreferences, getUserPreference, setUserPreference, updateUserPreference } from '.'

function setupTestApp() {
  return createTestApp()
    .extend(contributionsPlugin())
    .extend(commandsPlugin())
    .extend(plugin())
}
describe(`plugin.init()`, () => {
  it('provides getUserPreference() API', () => {
    const app = setupTestApp()
    const o = new AssertOrder(1)
    app.commands.register(
      getUserPreference.type,
      getUserPreference.listener(({ key }) => {
        expect(key).toEqual('some-unique-id')
        o.once(1)
        return { a: 1 }
      })
    )

    expect(app.preferences.get('some-unique-id')).toEqual({ a: 1 })

    o.end()
  })

  it('provides setUserPreference() API', () => {
    const app = setupTestApp()
    const o = new AssertOrder(1)
    app.commands.register(
      setUserPreference.type,
      setUserPreference.listener(({ key, value }) => {
        expect(key).toEqual('some-unique-id')
        expect(value).toEqual('{ a: 1 }')
        o.once(1)
      })
    )

    app.preferences.set('some-unique-id', '{ a: 1 }')

    o.end()
  })

  it('provides updateUserPreference() API', () => {
    const app = setupTestApp()
    const store = record<string, string>()

    app.commands.register(
      setUserPreference.type,
      setUserPreference.listener(({ key, value }) => store[key] = value)
    )
    app.commands.register(
      getUserPreference.type,
      getUserPreference.listener(({ key }) => store[key])
    )
    app.commands.register(
      updateUserPreference.type,
      updateUserPreference.listener(({ key, handler }) => store[key] = handler(store[key]))
    )

    app.preferences.set('some-unique-id', 'value')
    app.preferences.update('some-unique-id', (value) => value! + 1)

    expect(store['some-unique-id']).toEqual('value1')
  })

  it('provides clearUserPreference() API', () => {
    const app = setupTestApp()
    const o = new AssertOrder(1)
    app.commands.register(
      clearUserPreference.type,
      clearUserPreference.listener(({ key }) => {
        expect(key).toEqual('some-unique-id')
        o.once(1)
      })
    )

    app.preferences.clear('some-unique-id')

    o.end()
  })

  it('provides clearUserPreferences() API', () => {
    const app = setupTestApp()

    const o = new AssertOrder(1)
    app.commands.register(
      clearUserPreferences.type,
      clearUserPreferences.listener(() => o.once(1))
    )

    app.preferences.clearAll()

    o.end()
  })
})

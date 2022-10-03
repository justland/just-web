import { createTestApp } from '@just-web/app'
import commandsPlugin from '@just-web/commands'
import contributionsPlugin from '@just-web/contributions'
import { AssertOrder } from 'assertron'
import plugin, { clearUserPreference, clearUserPreferences, getUserPreference, setUserPreference } from '.'

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
        expect(value).toEqual({ a: 1 })
        o.once(1)
      })
    )

    app.preferences.set('some-unique-id', { a: 1 })

    o.end()
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

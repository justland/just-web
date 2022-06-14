import { createTestLogContext } from '@just-web/log'
import { asAny } from 'type-plus'
import { createContext, JustWebError } from '..'
import { createPluginsClosure } from './context'

describe('addPlugin()', () => {
  test('throw error if a plugin has the same property as the context (app)', async () => {
    const context = createContext({ logContext: createTestLogContext() })
    const [m] = createPluginsClosure({ context })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    asAny(m).abc = {}

    await expect(() => m.addPlugin({
      async activate() { return [{ abc: {} }] }
    })).rejects
      .toEqual(new JustWebError(`unable to load plugin: it is overriding an existing property 'abc'`))
  })

  test('plugin.activate() can return nothing', async () => {
    const context = createContext({ logContext: createTestLogContext() })
    const [m] = createPluginsClosure({ context })
    let called = false
    await m.addPlugin({
      async activate() { called = true }
    })
    expect(called).toBe(true)
  })
})

import { isType } from 'type-plus'
import { definePlugin, PluginContext, StartContext } from './index.js'

describe(definePlugin.name, () => {
  describe('PluginModule_A: no PluginContext and StartContext', () => {
    it('requires only the init() function. NeedContext can be omitted', () => {
      let plugin = definePlugin(() => ({ name: 'test-plugin', init: () => {} }))
      plugin = definePlugin(() => ({ name: 'test-plugin', init() {} }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => void, typeof m.init>()
    })

    it('defaults NeedContext to Record<string|symbol, any>', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init(ctx) {
          isType.equal<true, Record<string | symbol, any>, typeof ctx>()
        }
      }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => void, typeof m.init>()
    })

    it('can specify NeedContext', async () => {
      const plugin = definePlugin(() => ({ name: 'test-plugin', init(_: { a: number }) {} }))
      const m = plugin()

      isType.equal<true, (ctx: { a: number }) => void, typeof m.init>()
    })

    it('with NeedContext, can specify `start()` with no StartContext', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init(_: { a: number }) {},
        async start(ctx) {
          isType.equal<false, any, typeof ctx>()
        }
      }))
      const m = plugin()

      isType.equal<true, (ctx: { a: number }) => void, typeof m.init>()
      isType.equal<true, (ctx: StartContext) => void | Promise<void>, typeof m.start>()
    })

    it('can specify `start()` with no StartContext', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init(_) {},
        async start(ctx) {
          isType.equal<false, any, typeof ctx>()
          // isType.equal<true, StartContextBase, typeof ctx>()
        }
      }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => void, typeof m.init>()
      isType.equal<true, (ctx: StartContext) => void | Promise<void>, typeof m.start>()
    })
  })

  describe('PluginModule_B: with PluginContext', () => {
    it('requires only the `init()` function. NeedContext can be omitted', () => {
      let plugin = definePlugin(() => ({ name: 'test-plugin', init: () => [{ b: 1 }] }))
      plugin = definePlugin(() => ({
        name: 'test-plugin',
        init() {
          return [{ b: 1 }]
        }
      }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => [{ b: number }], typeof m.init>()
    })

    it('with NeedContext, can specify `start()` with no StartContext', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init: (_: { a: number }) => [{ b: 1 }],
        async start() {}
      }))
      const m = plugin()

      isType.equal<true, (ctx: { a: number }) => [{ b: number }], typeof m.init>()
      isType.equal<true, (ctx: StartContext) => void | Promise<void>, typeof m.start>()
    })

    it('can specify `start()` with no StartContext', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init: () => [{ b: 1 }],
        async start() {}
      }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => [{ b: number }], typeof m.init>()
      isType.equal<true, (ctx: StartContext) => void | Promise<void>, typeof m.start>()
    })

    it('can detect Params type', () => {
      const plugin = definePlugin((options?: { a: number }) => ({
        name: 'dummy',
        init: () => [{ dummy: options?.a }]
      }))

      isType.equal<true, [options?: { a: number }], Parameters<typeof plugin>>()
    })

    it('can detect Params type with NeedContext', () => {
      const plugin = definePlugin((options?: { a: number }) => ({
        name: 'dummy',
        init: (_: { a: number }) => [{ dummy: options?.a }]
      }))

      type P = Parameters<typeof plugin>
      isType.equal<true, [options?: { a: number }], P>()
    })

    // this looks like a bug in TS
    // it('can detect Params type with NeedContext in function form', () => {
    //   const plugin = definePlugin((options?: { a: number }) => ({
    //     name: 'dummy',
    //     init(_: { a: number }) { return [{ dummy: options?.a }] }
    //   }))

    //   type P = Parameters<typeof plugin>
    //   isType.equal<true, [options?: { a: number }], P>()
    // })
  })
})

describe('PluginContext', () => {
  it('gets PluginContext from TypeB', () => {
    const typeB = definePlugin(() => ({ name: 'test-plugin', init: () => [{ b: 1 }] }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })
  it('gets PluginContext from TypeB with NeedContext', () => {
    const typeB = definePlugin(() => ({ name: 'test-plugin', init: (_: { a: number }) => [{ b: 1 }] }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })
  it('gets PluginContext from TypeB with Param', () => {
    const typeB = definePlugin((_: number) => ({ name: 'test-plugin', init: () => [{ b: 1 }] }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })
  it('gets PluginContext from TypeB with Param and NeedContext', () => {
    const typeB = definePlugin((_: number) => ({
      name: 'test-plugin',
      init: (_: { a: number }) => [{ b: 1 }]
    }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })

  it('gets PluginContext from TypeB_WithStart', () => {
    const typeB = definePlugin(() => ({ name: 'test-plugin', init: () => [{ b: 1 }], async start() {} }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })
  it('gets PluginContext from TypeB_WithStart with NeedContext', () => {
    const typeB = definePlugin(() => ({
      name: 'test-plugin',
      init: (_: { a: number }) => [{ b: 1 }],
      async start() {}
    }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })
  it('gets PluginContext from TypeB_WithStart with Param', () => {
    const typeB = definePlugin((_: number) => ({
      name: 'test-plugin',
      init: () => [{ b: 1 }],
      async start() {}
    }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })
  it('gets PluginContext from TypeB_WithStart with Param and NeedContext', () => {
    const typeB = definePlugin((_: number) => ({
      name: 'test-plugin',
      init: (_: { a: number }) => [{ b: 1 }],
      async start() {}
    }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })

  it('returns never when the plugin has no PluginContext', () => {
    const typeA = definePlugin(() => ({ name: 'test-plugin', init: () => {} }))
    type A = PluginContext<typeof typeA>
    isType.equal<true, never, A>()
  })
})

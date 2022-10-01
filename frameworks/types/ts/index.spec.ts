import { createStandardLog, LogMethodNames, StandardLogOptions } from 'standard-log'
import { HasKey, isType } from 'type-plus'
import { defineInitialize, definePlugin, defineStart } from '.'

describe(defineInitialize.name, () => {
  it('accepts function returning a PluginContext', () => {
    const i = defineInitialize(() => ([{ a: 1 }]))
    expect(i({})).toEqual([{ a: 1 }])
  })

  it('accepts function returns a PluginContext and a StartContext', () => {
    const i = defineInitialize(() => ([{ a: 1 }, { b: 2 }]))
    expect(i({})).toEqual([{ a: 1 }, { b: 2 }])
  })

  it('accepts fucntion returns no PluginContext and a StartContext', () => {
    const i = defineInitialize(() => ([undefined, { b: 2 }]))
    expect(i({})).toEqual([undefined, { b: 2 }])
  })

  it('accepts function returns no context', async () => {
    const i = defineInitialize(() => { })
    expect(i({})).toBeUndefined()
  })
})

describe(defineStart.name, () => {
  it('accepts async function without StartContext', async () => {
    defineStart(async () => { })
  })
})

describe(definePlugin.name, () => {
  describe('PluginModule_A: no PluginContext and StartContext', () => {
    it('requires only the init() function. NeedContext can be omitted', () => {
      let plugin = definePlugin({ name: 'test-plugin', init: () => { } })
      plugin = definePlugin({ name: 'test-plugin', init() { } })

      isType.equal<true, (ctx: Record<string | symbol, any>) => void, typeof plugin.init>()
    })

    it('does not return plugin with initForTest if not specified', () => {
      const plugin = definePlugin({ name: 'test-plugin', init: (_: { a: number }) => { } })

      isType.f<HasKey<typeof plugin, 'initForTest'>>()
    })

    it('can specify initForTest()', () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init(ctx) {
          isType.equal<true, Record<string | symbol, any>, typeof ctx>()
        },
        initForTest(ctx) {
          isType.equal<true, Record<string | symbol, any>, typeof ctx>()
        }
      })

      isType.equal<true, (ctx: Record<string | symbol, any>) => void, typeof plugin.init>()
      isType.equal<true, (ctx: Record<string | symbol, any>) => void, typeof plugin.initForTest>()
    })

    it('defaults NeedContext to Record<string|symbol, any>', () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init(ctx) {
          isType.equal<true, Record<string | symbol, any>, typeof ctx>()
        }
      })

      isType.equal<true, (ctx: Record<string | symbol, any>) => void, typeof plugin.init>()
    })

    it('can specify NeedContext', async () => {
      const plugin = definePlugin({ name: 'test-plugin', init(_: { a: number }) { } })

      isType.equal<true, (ctx: { a: number }) => void, typeof plugin.init>()
    })

    it('links NeedContext for `init()` and `initForTest()`', async () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init(_: { a: number }) { },
        initForTest(ctx) {
          isType.equal<true, { a: number }, typeof ctx>()
        }
      })

      isType.equal<true, (ctx: { a: number }) => void, typeof plugin.init>()
      isType.equal<true, (ctx: { a: number }) => void, typeof plugin.initForTest>()
    })

    it('`initForTest()` can skip ctx', async () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init(_: { a: number }) { },
        initForTest() { }
      })

      isType.equal<true, (ctx: { a: number }) => void, typeof plugin.init>()
      isType.equal<true, (ctx: { a: number }) => void, typeof plugin.initForTest>()
    })

    it('allows `initForTest()` to returns a TestPluginContext', () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init(_: { a: number }) { },
        initForTest(ctx) {
          isType.equal<true, { a: number }, typeof ctx>()
          return [{ b: 1 }]
        }
      })

      isType.equal<true, (ctx: { a: number }) => void, typeof plugin.init>()
      isType.equal<true, (ctx: { a: number }) => [{ b: number }], typeof plugin.initForTest>()
    })
  })

  describe('PluginModule_B: with PluginContext', () => {
    it('requires only the `init()` function. NeedContext can be omitted', () => {
      let plugin = definePlugin({ name: 'test-plugin', init: () => ([{ b: 1 }]) })
      plugin = definePlugin({ name: 'test-plugin', init() { return [{ b: 1 }] } })

      isType.equal<true, (ctx: Record<string | symbol, any>) => [{ b: number }], typeof plugin.init>()
    })

    it('does not return plugin with `initForTest()` if not specified', () => {
      const plugin = definePlugin({ name: 'test-plugin', init: (_: { a: number }) => ([{ a: 1 }]) })

      isType.f<HasKey<typeof plugin, 'initForTest'>>()
    })

    it('can specify initForTest()', () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init(ctx) {
          isType.equal<true, Record<string | symbol, any>, typeof ctx>()
          return [{ b: 1 }]
        },
        initForTest(ctx) {
          isType.equal<true, Record<string | symbol, any>, typeof ctx>()
          return [{ b: 1 }]
        }
      })

      isType.equal<true, (ctx: Record<string | symbol, any>) => [{ b: number }], typeof plugin.init>()
      isType.equal<true, (ctx: Record<string | symbol, any>) => [{ b: number }], typeof plugin.initForTest>()
    })

    it('allows `initForTest()` to returns a TestPluginContext', () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init(_: { a: number }) { return [{ b: 1 }] },
        initForTest(ctx) {
          isType.equal<true, { a: number }, typeof ctx>()
          return [{ b: 1, c: 3 }]
        }
      })
      isType.equal<true, (ctx: { a: number }) => [{ b: number }], typeof plugin.init>()
      isType.equal<true, (ctx: { a: number }) => [{ b: number, c: number }], typeof plugin.initForTest>()
    })
  })

  describe('PluginModule_C: with StartContext', () => {
    it('requires `init()` and `start()`. ', () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init: () => ([undefined, { s: 1 }]),
        start: async (ctx) => isType.equal<true, { s: number }, typeof ctx>()
      })

      isType.equal<true, (ctx: Record<string | symbol, any>) => [undefined, { s: number }], typeof plugin.init>()
      isType.equal<true, (ctx: { s: number }) => Promise<void>, typeof plugin.start>()
    })

    it('does not return plugin with `initForTest()` if not specified', () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init: (_: { a: number }) => ([undefined, { s: 1 }]),
        start: async () => { }
      })

      isType.equal<true, (ctx: { a: number }) => [undefined, { s: number }], typeof plugin.init>()
      isType.f<HasKey<typeof plugin, 'initForTest'>>()
      isType.equal<true, (ctx: { s: number }) => Promise<void>, typeof plugin.start>()
    })

    it('can specify initForTest()', () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init: (_: { a: number }) => ([undefined, { s: 1 }]),
        initForTest() { return [undefined, { s: 1 }] },
        start: async () => { },
      })

      isType.equal<true, (ctx: { a: number }) => [undefined, { s: number }], typeof plugin.init>()
      isType.equal<true, (ctx: { a: number }) => [undefined, { s: number }], typeof plugin.initForTest>()
      isType.equal<true, (ctx: { s: number }) => Promise<void>, typeof plugin.start>()
    })

    it('allows `initForTest()` to returns a TestPluginContext', () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init(_: { a: number }) { return [undefined, { s: 2 }] },
        initForTest(ctx) {
          isType.equal<true, { a: number }, typeof ctx>()
          return [{ b: 1, c: 3 }, { s: 2 }]
        },
        async start() { },
      })

      isType.equal<true, (ctx: { a: number }) => [undefined, { s: number }], typeof plugin.init>()
      isType.equal<true, (ctx: { a: number }) => [{ b: number, c: number }, { s: number }], typeof plugin.initForTest>()
      isType.equal<true, (ctx: { s: number }) => Promise<void>, typeof plugin.start>()
    })
  })

  describe('PluginModule_D: with PluginContext and StartContext', () => {
    it('requires `init()` and `start()`. ', () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init: () => ([{ b: 1 }, { s: 1 }]),
        start: async (ctx) => isType.equal<true, { s: number }, typeof ctx>()
      })

      isType.equal<true, (ctx: Record<string | symbol, any>) => [{ b: number }, { s: number }], typeof plugin.init>()
      isType.equal<true, (ctx: { s: number }) => Promise<void>, typeof plugin.start>()
    })

    it('does not return plugin with `initForTest()` if not specified', () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init: (_: { a: number }) => ([{ b: 1 }, { s: 1 }]),
        start: async () => { }
      })

      isType.equal<true, (ctx: { a: number }) => [{ b: number }, { s: number }], typeof plugin.init>()
      isType.equal<true, (ctx: { s: number }) => Promise<void>, typeof plugin.start>()
      isType.f<HasKey<typeof plugin, 'initForTest'>>()
    })

    it('can specify initForTest()', () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init: (_: { a: number }) => ([{ b: 1 }, { s: 1 }]),
        initForTest() { return [{ b: 1 }, { s: 1 }] },
        start: async () => { },
      })

      isType.equal<true, (ctx: { a: number }) => [{ b: number }, { s: number }], typeof plugin.init>()
      isType.equal<true, (ctx: { a: number }) => [{ b: number }, { s: number }], typeof plugin.initForTest>()
      isType.equal<true, (ctx: { s: number }) => Promise<void>, typeof plugin.start>()
    })

    it('allows `initForTest()` to returns a TestPluginContext', () => {
      const plugin = definePlugin({
        name: 'test-plugin',
        init(_: { a: number }) { return [{ b: 1 }, { s: 2 }] },
        initForTest(ctx) {
          isType.equal<true, { a: number }, typeof ctx>()
          return [{ b: 1, c: 3 }, { s: 2 }]
        },
        async start() { },
      })

      isType.equal<true, (ctx: { a: number }) => [{ b: number }, { s: number }], typeof plugin.init>()
      isType.equal<true, (ctx: { a: number }) => [{ b: number, c: number }, { s: number }], typeof plugin.initForTest>()
      isType.equal<true, (ctx: { s: number }) => Promise<void>, typeof plugin.start>()
    })
  })

  describe('others', () => {
    it('with generic uses defineInit()', async () => {
      // `definePlugin()` does not work with property level generics.
      // so need to use `defineInit()` and `defineStart()` in this case.

      // const plugin = definePlugin({ name: 'test-plugin',
      //   async init<N extends string = LogMethodNames>({ options }: { options: StandardLogOptions<N> }) {
      //     const sl = createStandardLog<N>(options)
      //     return [sl]
      //   }
      // })
      const plugin = {
        init: defineInitialize(<N extends string = LogMethodNames>({ options }: { options: StandardLogOptions<N> }) => {
          const sl = createStandardLog<N>(options)
          return [sl]
        })
      }

      const [sl] = plugin.init({ options: { customLevels: { silly: 1000 } } })
      const log = sl.getLogger('test')
      expect(log.silly).toBeDefined()
    })
  })
})

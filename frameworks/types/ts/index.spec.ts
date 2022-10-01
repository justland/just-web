import { createStandardLog, LogMethodNames, StandardLogOptions } from 'standard-log'
import { HasKey, isType } from 'type-plus'
import { defineInitialize, definePlugin, defineStart } from '.'

describe(defineInitialize.name, () => {
  it('accepts async function returning a PluginContext', async () => {
    const i = defineInitialize(async () => ([{ a: 1 }]))
    expect(await i({})).toEqual([{ a: 1 }])
  })

  it('accepts async function returns a PluginContext and a StartContext', async () => {
    const i = defineInitialize(async () => ([{ a: 1 }, { b: 2 }]))
    expect(await i({})).toEqual([{ a: 1 }, { b: 2 }])
  })

  it('accepts async fucntion returns no PluginContext and a StartContext', async () => {
    const i = defineInitialize(async () => ([undefined, { b: 2 }]))
    expect(await i({})).toEqual([undefined, { b: 2 }])
  })

  it('accepts async function returns no context', async () => {
    const i = defineInitialize(async () => { })
    expect(await i({})).toBeUndefined()
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
      let plugin = definePlugin({ init: async () => { } })
      plugin = definePlugin({ async init() { } })

      isType.equal<true, [Record<string | symbol, any>], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<void>, ReturnType<typeof plugin.init>>()
    })

    it('does not return plugin with initForTest if not specified', () => {
      const plugin = definePlugin({ init: async (_: { a: number }) => { } })

      isType.f<HasKey<typeof plugin, 'initForTest'>>()
    })

    it('can specify initForTest()', () => {
      const plugin = definePlugin({
        async init(ctx) {
          isType.equal<true, Record<string | symbol, any>, typeof ctx>()
        },
        async initForTest(ctx) {
          isType.equal<true, Record<string | symbol, any>, typeof ctx>()
        }
      })

      isType.equal<true, [Record<string | symbol, any>], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<void>, ReturnType<typeof plugin.init>>()

      isType.equal<true, [Record<string | symbol, any>], Parameters<typeof plugin.initForTest>>()
      isType.equal<true, Promise<void>, ReturnType<typeof plugin.initForTest>>()
    })

    it('defaults NeedContext to Record<string|symbol, any>', () => {
      const plugin = definePlugin({
        async init(ctx) {
          isType.equal<true, Record<string | symbol, any>, typeof ctx>()
        }
      })

      isType.equal<true, [Record<string | symbol, any>], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<void>, ReturnType<typeof plugin.init>>()
    })

    it('can specify NeedContext', async () => {
      const plugin = definePlugin({ async init(_: { a: number }) { } })

      isType.equal<true, [{ a: number }], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<void>, ReturnType<typeof plugin.init>>()
    })

    it('links NeedContext for `init()` and `initForTest()`', async () => {
      const plugin = definePlugin({
        async init(_: { a: number }) { },
        async initForTest(ctx) {
          isType.equal<true, { a: number }, typeof ctx>()
        }
      })

      isType.equal<true, [{ a: number }], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<void>, ReturnType<typeof plugin.init>>()

      isType.equal<true, [{ a: number }], Parameters<typeof plugin.initForTest>>()
      isType.equal<true, Promise<void>, ReturnType<typeof plugin.initForTest>>()
    })

    it('`initForTest()` can skip ctx', async () => {
      const plugin = definePlugin({
        async init(_: { a: number }) { },
        async initForTest() { }
      })

      isType.equal<true, [{ a: number }], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<void>, ReturnType<typeof plugin.init>>()

      isType.equal<true, [{ a: number }], Parameters<typeof plugin.initForTest>>()
      isType.equal<true, Promise<void>, ReturnType<typeof plugin.initForTest>>()
    })

    it('allows `initForTest()` to returns a TestPluginContext', () => {
      const plugin = definePlugin({
        async init(_: { a: number }) { },
        async initForTest(ctx) {
          isType.equal<true, { a: number }, typeof ctx>()
          return [{ b: 1 }]
        }
      })
      isType.equal<true, [{ a: number }], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<void>, ReturnType<typeof plugin.init>>()

      isType.equal<true, [{ a: number }], Parameters<typeof plugin.initForTest>>()
      isType.equal<true, Promise<[{ b: number }]>, ReturnType<typeof plugin.initForTest>>()
    })
  })

  describe('PluginModule_B: with PluginContext', () => {
    it('requires only the `init()` function. NeedContext can be omitted', () => {
      let plugin = definePlugin({ init: async () => ([{ a: 1 }]) })
      plugin = definePlugin({ async init() { return [{ a: 1 }] } })

      isType.equal<true, [Record<string | symbol, any>], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<[{ a: number }]>, ReturnType<typeof plugin.init>>()
    })

    it('does not return plugin with `initForTest()` if not specified', () => {
      const plugin = definePlugin({ init: async (_: { a: number }) => ([{ a: 1 }]) })

      isType.f<HasKey<typeof plugin, 'initForTest'>>()
    })

    it('can specify initForTest()', () => {
      const plugin = definePlugin({
        async init(ctx) {
          isType.equal<true, Record<string | symbol, any>, typeof ctx>()
          return [{ a: 1 }]
        },
        async initForTest(ctx) {
          isType.equal<true, Record<string | symbol, any>, typeof ctx>()
          return [{ a: 1 }]
        }
      })

      isType.equal<true, [Record<string | symbol, any>], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<[{ a: number }]>, ReturnType<typeof plugin.init>>()

      isType.equal<true, [Record<string | symbol, any>], Parameters<typeof plugin.initForTest>>()
      isType.equal<true, Promise<[{ a: number }]>, ReturnType<typeof plugin.initForTest>>()
    })

    it('allows `initForTest()` to returns a TestPluginContext', () => {
      const plugin = definePlugin({
        async init(_: { x: number }) { return [{ a: 1 }] },
        async initForTest(ctx) {
          isType.equal<true, { x: number }, typeof ctx>()
          return [{ a: 1, b: 1 }]
        }
      })
      isType.equal<true, [{ x: number }], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<[{ a: number }]>, ReturnType<typeof plugin.init>>()

      isType.equal<true, [{ x: number }], Parameters<typeof plugin.initForTest>>()
      isType.equal<true, Promise<[{ a: number, b: number }]>, ReturnType<typeof plugin.initForTest>>()
    })
  })

  describe('PluginModule_C: with StartContext', () => {
    it('requires `init()` and `start()`. ', () => {
      const plugin = definePlugin({
        init: async () => ([undefined, { b: 1 }]),
        start: async (ctx) => isType.equal<true, { b: number }, typeof ctx>()
      })

      isType.equal<true, [Record<string | symbol, any>], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<[undefined, { b: number }]>, ReturnType<typeof plugin.init>>()

      isType.equal<true, (ctx: { b: number }) => Promise<void>, typeof plugin.start>()
    })

    it('does not return plugin with `initForTest()` if not specified', () => {
      const plugin = definePlugin({
        init: async (_: { x: number }) => ([undefined, { b: 1 }]),
        start: async () => { }
      })

      isType.equal<true, [{ x: number }], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<[undefined, { b: number }]>, ReturnType<typeof plugin.init>>()

      isType.equal<true, (ctx: { b: number }) => Promise<void>, typeof plugin.start>()
      isType.f<HasKey<typeof plugin, 'initForTest'>>()
    })

    it('can specify initForTest()', () => {
      const plugin = definePlugin({
        init: async (_: { x: number }) => ([undefined, { b: 1 }]),
        start: async () => { },
        async initForTest() { return [undefined, { b: 1 }] }
      })

      isType.equal<true, [{ x: number }], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<[undefined, { b: number }]>, ReturnType<typeof plugin.init>>()

      isType.equal<true, (ctx: { b: number }) => Promise<void>, typeof plugin.start>()

      isType.equal<true, [{ x: number }], Parameters<typeof plugin.initForTest>>()
      isType.equal<true, Promise<[undefined, { b: number }]>, ReturnType<typeof plugin.initForTest>>()
    })

    it('allows `initForTest()` to returns a TestPluginContext', () => {
      const plugin = definePlugin({
        async init(_: { x: number }) { return [undefined, { b: 2 }] },
        async start() { },
        async initForTest(ctx) {
          isType.equal<true, { x: number }, typeof ctx>()
          return [{ a: 1, b: 1 }, { b: 2 }]
        }
      })
      isType.equal<true, [{ x: number }], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<[undefined, { b: number }]>, ReturnType<typeof plugin.init>>()

      isType.equal<true, (ctx: { b: number }) => Promise<void>, typeof plugin.start>()

      isType.equal<true, [{ x: number }], Parameters<typeof plugin.initForTest>>()
      isType.equal<true, Promise<[{ a: number, b: number }, { b: number }]>, ReturnType<typeof plugin.initForTest>>()
    })
  })

  describe('PluginModule_D: with PluginContext and StartContext', () => {
    it('requires `init()` and `start()`. ', () => {
      const plugin = definePlugin({
        init: async () => ([{ a: 1 }, { b: 1 }]),
        start: async (ctx) => isType.equal<true, { b: number }, typeof ctx>()
      })

      isType.equal<true, [Record<string | symbol, any>], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<[{ a: number }, { b: number }]>, ReturnType<typeof plugin.init>>()

      isType.equal<true, (ctx: { b: number }) => Promise<void>, typeof plugin.start>()
    })

    it('does not return plugin with `initForTest()` if not specified', () => {
      const plugin = definePlugin({
        init: async (_: { x: number }) => ([{ a: 1 }, { b: 1 }]),
        start: async () => { }
      })

      isType.equal<true, [{ x: number }], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<[{ a: number }, { b: number }]>, ReturnType<typeof plugin.init>>()

      isType.equal<true, (ctx: { b: number }) => Promise<void>, typeof plugin.start>()
      isType.f<HasKey<typeof plugin, 'initForTest'>>()
    })

    it('can specify initForTest()', () => {
      const plugin = definePlugin({
        init: async (_: { x: number }) => ([{ a: 1 }, { b: 1 }]),
        start: async () => { },
        async initForTest() { return [{ a: 1 }, { b: 1 }] }
      })

      isType.equal<true, [{ x: number }], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<[{ a: number }, { b: number }]>, ReturnType<typeof plugin.init>>()

      isType.equal<true, (ctx: { b: number }) => Promise<void>, typeof plugin.start>()

      isType.equal<true, [{ x: number }], Parameters<typeof plugin.initForTest>>()
      isType.equal<true, Promise<[{ a: number }, { b: number }]>, ReturnType<typeof plugin.initForTest>>()
    })

    it('allows `initForTest()` to returns a TestPluginContext', () => {
      const plugin = definePlugin({
        async init(_: { x: number }) { return [{ a: 1 }, { b: 2 }] },
        async start() { },
        async initForTest(ctx) {
          isType.equal<true, { x: number }, typeof ctx>()
          return [{ a: 1, b: 1 }, { b: 2 }]
        }
      })
      isType.equal<true, [{ x: number }], Parameters<typeof plugin.init>>()
      isType.equal<true, Promise<[{ a: number }, { b: number }]>, ReturnType<typeof plugin.init>>()

      isType.equal<true, (ctx: { b: number }) => Promise<void>, typeof plugin.start>()

      isType.equal<true, [{ x: number }], Parameters<typeof plugin.initForTest>>()
      isType.equal<true, Promise<[{ a: number, b: number }, { b: number }]>, ReturnType<typeof plugin.initForTest>>()
    })
  })

  describe('others', () => {
    it('with generic uses defineInit()', async () => {
      // `definePlugin()` does not work with property level generics.
      // so need to use `defineInit()` and `defineStart()` in this case.

      // const plugin = definePlugin({
      //   async init<N extends string = LogMethodNames>({ options }: { options: StandardLogOptions<N> }) {
      //     const sl = createStandardLog<N>(options)
      //     return [sl]
      //   }
      // })
      const plugin = {
        init: defineInitialize(async <N extends string = LogMethodNames>({ options }: { options: StandardLogOptions<N> }) => {
          const sl = createStandardLog<N>(options)
          return [sl]
        })
      }

      const [sl] = await plugin.init({ options: { customLevels: { silly: 1000 } } })
      const log = sl.getLogger('test')
      expect(log.silly).toBeDefined()
    })
  })
})

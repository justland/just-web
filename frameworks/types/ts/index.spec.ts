import { createStandardLog, LogMethodNames, StandardLogOptions } from 'standard-log'
import { isType, LeftJoin } from 'type-plus'
import { defineInitialize, definePlugin, defineStart, PluginContext, StartContextBase } from '.'

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
      let plugin = definePlugin(() => ({ name: 'test-plugin', init: () => { } }))
      plugin = definePlugin(() => ({ name: 'test-plugin', init() { } }))
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
      const plugin = definePlugin(() => ({ name: 'test-plugin', init(_: { a: number }) { } }))
      const m = plugin()

      isType.equal<true, (ctx: { a: number }) => void, typeof m.init>()
    })

    it('with NeedContext, can specify `start()` with no StartContext', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init(_: { a: number }) { },
        async start(ctx) {
          isType.equal<false, any, typeof ctx>()
        }
      }))
      const m = plugin()

      isType.equal<true, (ctx: { a: number }) => void, typeof m.init>()
      isType.equal<true, (ctx: StartContextBase) => void | Promise<void>, typeof m.start>()
    })

    it('can specify `start()` with no StartContext', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init(_) { },
        async start(ctx) {
          isType.equal<false, any, typeof ctx>()
          // isType.equal<true, StartContextBase, typeof ctx>()
        }
      }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => void, typeof m.init>()
      isType.equal<true, (ctx: StartContextBase) => void | Promise<void>, typeof m.start>()
    })
  })

  describe('PluginModule_B: with PluginContext', () => {
    it('requires only the `init()` function. NeedContext can be omitted', () => {
      let plugin = definePlugin(() => ({ name: 'test-plugin', init: () => ([{ b: 1 }]) }))
      plugin = definePlugin(() => ({ name: 'test-plugin', init() { return [{ b: 1 }] } }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => [{ b: number }], typeof m.init>()
    })

    it('with NeedContext, can specify `start()` with no StartContext', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init: (_: { a: number }) => [{ b: 1 }],
        async start() { }
      }))
      const m = plugin()

      isType.equal<true, (ctx: { a: number }) => [{ b: number }], typeof m.init>()
      isType.equal<true, (ctx: StartContextBase) => void | Promise<void>, typeof m.start>()
    })

    it('can specify `start()` with no StartContext', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init: () => [{ b: 1 }],
        async start() { }
      }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => [{ b: number }], typeof m.init>()
      isType.equal<true, (ctx: StartContextBase) => void | Promise<void>, typeof m.start>()
    })

    it('can detect Params type', () => {
      const plugin = definePlugin((options?: { a: number }) => ({
        name: 'dummy',
        init: () => ([{ dummy: options?.a }])
      }))

      isType.equal<true, [options?: { a: number }], Parameters<typeof plugin>>()
    })

    it('can detect Params type with NeedContext', () => {
      const plugin = definePlugin((options?: { a: number }) => ({
        name: 'dummy',
        init: (_: { a: number }) => ([{ dummy: options?.a }])
      }))

      type P = Parameters<typeof plugin>
      isType.equal<true, [options?: { a: number }], P>()
    })

    // it('can detect Params type with NeedContext in function form', () => {
    //   const plugin = definePlugin((options?: { a: number }) => ({
    //     name: 'dummy',
    //     init(_: { a: number }) { return [{ dummy: options?.a }] }
    //   }))

    //   type P = Parameters<typeof plugin>
    //   isType.equal<true, [options?: { a: number }], P>()
    // })
  })

  describe('PluginModule_C: with StartContext', () => {
    it('requires `init()` and `start()`. ', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init: () => ([undefined, { s: 1 }]),
        start: async (ctx) => isType.equal<true, StartContextBase & { s: number }, typeof ctx>()
      }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => [undefined, { s: number }], typeof m.init>()
      isType.equal<true, (ctx: StartContextBase & { s: number }) => void | Promise<void>, typeof m.start>()
    })
  })

  describe('PluginModule_D: with PluginContext and StartContext', () => {
    it('requires `init()` and `start()`. ', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init: () => ([{ b: 1 }, { s: 1 }]),
        start: async (ctx) => isType.equal<true, StartContextBase & { s: number }, typeof ctx>()
      }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => [{ b: number }, { s: number }], typeof m.init>()
      isType.equal<true, (ctx: StartContextBase & { s: number }) => void | Promise<void>, typeof m.start>()
    })

    it('allows StartContext override props in StartContextBase', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init: () => ([{ b: 1 }, { log: 1 }]),
        start: async (ctx) => {
          isType.equal<true, LeftJoin<StartContextBase, { log: number }>, typeof ctx>()
          isType.equal<true, number, typeof ctx.log>()
        }
      }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => [{ b: number }, { log: number }], typeof m.init>()
      isType.equal<true, (ctx: LeftJoin<StartContextBase, { log: number }>) => void | Promise<void>, typeof m.start>()
    })

    it('detects PluginContext with StartContext', () => {
      const plugin = definePlugin(() => ({
        name: 'dummy',
        init: (_: { a: number }) => ([{ b: 1 }, { s: 1 }]),
        start: async (ctx) => {
          isType.equal<true, StartContextBase & { s: number }, typeof ctx>()
        }
      }))

      type PluginContext = ReturnType<ReturnType<typeof plugin>['init']>[0]
      isType.equal<true, { b: number }, PluginContext>()
    })

    it('detects PluginContext with StartContext with sync start', () => {
      const plugin = definePlugin(() => ({
        name: 'dummy',
        init: (_: { a: number }) => ([{ b: 1 }, { s: 1 }]),
        start: (ctx) => {
          isType.equal<true, StartContextBase & { s: number }, typeof ctx>()
        }
      }))

      type PluginContext = ReturnType<ReturnType<typeof plugin>['init']>[0]
      isType.equal<true, { b: number }, PluginContext>()
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
      const plugin = () => ({
        init: defineInitialize(<N extends string = LogMethodNames>({ options }: { options: StandardLogOptions<N> }) => {
          const sl = createStandardLog<N>(options)
          return [sl]
        })
      })

      const m = plugin()

      const [sl] = m.init({ options: { customLevels: { silly: 1000 } } })
      const log = sl.getLogger('test')
      expect(log.silly).toBeDefined()
    })
  })
})

describe('PluginContext', () => {
  it('gets PluginContext from TypeB', () => {
    const typeB = definePlugin(() => ({ name: 'test-plugin', init: () => ([{ b: 1 }]) }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })
  it('gets PluginContext from TypeB with NeedContext', () => {
    const typeB = definePlugin(() => ({ name: 'test-plugin', init: (_: { a: number }) => ([{ b: 1 }]) }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })
  it('gets PluginContext from TypeB with Param', () => {
    const typeB = definePlugin((_: number) => ({ name: 'test-plugin', init: () => ([{ b: 1 }]) }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })
  it('gets PluginContext from TypeB with Param and NeedContext', () => {
    const typeB = definePlugin((_: number) => ({ name: 'test-plugin', init: (_: { a: number }) => ([{ b: 1 }]) }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })

  it('gets PluginContext from TypeB_WithStart', () => {
    const typeB = definePlugin(() => ({ name: 'test-plugin', init: () => ([{ b: 1 }]), async start() { } }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })
  it('gets PluginContext from TypeB_WithStart with NeedContext', () => {
    const typeB = definePlugin(() => ({ name: 'test-plugin', init: (_: { a: number }) => ([{ b: 1 }]), async start() { } }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })
  it('gets PluginContext from TypeB_WithStart with Param', () => {
    const typeB = definePlugin((_: number) => ({ name: 'test-plugin', init: () => ([{ b: 1 }]), async start() { } }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })
  it('gets PluginContext from TypeB_WithStart with Param and NeedContext', () => {
    const typeB = definePlugin((_: number) => ({ name: 'test-plugin', init: (_: { a: number }) => ([{ b: 1 }]), async start() { } }))
    isType.equal<true, { b: number }, PluginContext<typeof typeB>>()
  })

  it('gets PluginContext from TypeD', () => {
    const typeD = definePlugin(() => ({ name: 'test-plugin', init: () => ([{ b: 1 }, { s: 1 }]), async start() { } }))
    type A = PluginContext<typeof typeD>
    isType.equal<true, { b: number }, A>()
  })
  it('gets PluginContext from TypeD with NeedContext', () => {
    const typeD = definePlugin(() => ({ name: 'test-plugin', init: (_: { a: number }) => ([{ b: 1 }, { s: 1 }]), async start() { } }))
    type A = PluginContext<typeof typeD>
    isType.equal<true, { b: number }, A>()
  })
  it('gets PluginContext from TypeD with Param', () => {
    const typeD = definePlugin((_: number) => ({ name: 'test-plugin', init: () => ([{ b: 1 }, { s: 1 }]), start: async (_: StartContextBase & { s: number }) => { } }))
    type A = PluginContext<typeof typeD>
    isType.equal<true, { b: number }, A>()
  })
  it('gets PluginContext from TypeD with Param and NeedContext', () => {
    const typeD = definePlugin((_: number) => ({ name: 'test-plugin', init: (_: { a: number }) => ([{ b: 1 }, { s: 1 }]), start: () => { } }))
    type A = PluginContext<typeof typeD>
    isType.equal<true, { b: number }, A>()
  })

  it('returns never when the plugin has no PluginContext', () => {
    const typeA = definePlugin(() => ({ name: 'test-plugin', init: () => { } }))
    type A = PluginContext<typeof typeA>
    isType.equal<true, never, A>()
  })
})

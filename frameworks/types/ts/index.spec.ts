import { createStandardLog, LogMethodNames, StandardLogOptions } from 'standard-log'
import { isType } from 'type-plus'
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
        async start() { }
      }))
      const m = plugin()

      isType.equal<true, (ctx: { a: number }) => void, typeof m.init>()
      isType.equal<true, () => Promise<void>, typeof m.start>()
    })

    it('can specify `start()` with no StartContext', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init() { },
        async start() { }
      }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => void, typeof m.init>()
      isType.equal<true, () => Promise<void>, typeof m.start>()
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
      isType.equal<true, () => Promise<void>, typeof m.start>()
    })

    it('can specify `start()` with no StartContext', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init: () => [{ b: 1 }],
        async start() { }
      }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => [{ b: number }], typeof m.init>()
      isType.equal<true, () => Promise<void>, typeof m.start>()
    })
  })

  describe('PluginModule_C: with StartContext', () => {
    it('requires `init()` and `start()`. ', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init: () => ([undefined, { s: 1 }]),
        start: async (ctx) => isType.equal<true, { s: number }, typeof ctx>()
      }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => [undefined, { s: number }], typeof m.init>()
      isType.equal<true, (ctx: { s: number }) => Promise<void>, typeof m.start>()
    })
  })

  describe('PluginModule_D: with PluginContext and StartContext', () => {
    it('requires `init()` and `start()`. ', () => {
      const plugin = definePlugin(() => ({
        name: 'test-plugin',
        init: () => ([{ b: 1 }, { s: 1 }]),
        start: async (ctx) => isType.equal<true, { s: number }, typeof ctx>()
      }))
      const m = plugin()

      isType.equal<true, (ctx: Record<string | symbol, any>) => [{ b: number }, { s: number }], typeof m.init>()
      isType.equal<true, (ctx: { s: number }) => Promise<void>, typeof m.start>()
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

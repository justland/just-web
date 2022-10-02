import logPlugin, { createPrefixedGetLogger, LogContext, LogMethodNames, LogOptions } from '@just-web/log'
import type { AppBaseContext, PluginModule } from '@just-web/types'
import { isType } from 'type-plus'
import { ctx } from './createApp.ctx'

export namespace createApp2 {
  export type Options<N extends string = LogMethodNames> = { name: string, log?: LogOptions<N> }
}

export function createApp2<N extends string = LogMethodNames>(options: createApp2.Options<N>) {
  const appContext = { name: options.name, id: ctx.genAppID() }

  const logModule = logPlugin(options.log)
  const [logctx] = logModule.init(appContext)
  const log = logctx.log as LogContext<LogMethodNames>['log']

  return appClosure({ ...appContext, log })
}

function appClosure(
  appContext: AppBaseContext & LogContext,
  _parentContext?: {
    pluginContext?: [PluginModule<any, any, any>, any],
    start(): Promise<void>
  }) {
  // const subApps: Array<{ start(): Promise<void> }> = []
  // return {
  //   async start() {
  //     if (parentContext) return parentContext.start()
  //     // pluginC.forEach
  //   }
  // }
  const log = appContext.log
  // this and extends apps needs to be a tree what when one of? `start()` is called,
  // all plugin starts are executed correctly.
  let pluginTuple: [{ name: string, start(ctx: any): Promise<void> }, any]
  return {
    ...appContext,
    extend<
      C extends Record<string | symbol, any>,
      N extends Record<string | symbol, any>,
      S extends Record<string | symbol, any>>(this: C, plugin: PluginModule<C, N, S>): C & N {
      // TODO: create a customer log module for `init()` here,
      // instead of doing it in `start()`
      const initResult = plugin.init(this)
      if (!initResult) {
        if (isType<{ name: string, start(ctx: any): Promise<void> }>(plugin, p => !!p.start))
          pluginTuple = [plugin, undefined]
        return this as any
      }
      const [pluginContext, startContext] = initResult
      if (isType<{ name: string, start(ctx: any): Promise<void> }>(plugin, p => !!p.start))
        pluginTuple = [plugin, startContext]
      return { ...this, ...pluginContext! }
    },
    async start() {
      if (pluginTuple) {
        const plugin = pluginTuple[0]
        const l = log.getLogger(plugin.name)
        await plugin.start({
          ...pluginTuple[1],
          log: Object.assign(l, {
            getLogger: createPrefixedGetLogger({ log }, plugin.name)
          })
        })
      }
      log.info('start')
    }
  }
}

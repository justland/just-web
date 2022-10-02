import logPlugin, { LogMethodNames, LogOptions } from '@just-web/log'
import type { PluginModule } from '@just-web/types'
import { ctx } from './createApp.ctx'

export namespace createApp2 {
  export type Options<N extends string = LogMethodNames> = { name: string, log?: LogOptions<N> }
}

export function createApp2<N extends string = LogMethodNames>(options: createApp2.Options<N>) {
  const appContext = { name: options.name, id: ctx.genAppID() }

  const [{ log }] = logPlugin<N>(options.log).init(appContext)
  return {
    ...appContext,
    log,
    extend<
      C extends Record<string | symbol, any>,
      N extends Record<string | symbol, any>,
      S extends Record<string | symbol, any>>(this: C, plugin: PluginModule<C, N, S, any>): C & N {
      const initResult = plugin.init(this)
      if (!initResult) return this as any
      const [pluginContext] = initResult
      return { ...this, ...pluginContext! }
    }
  }
}

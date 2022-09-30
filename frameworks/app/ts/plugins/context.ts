import type { Logger } from '@just-web/log'
import { forEachKey } from 'type-plus'
import type { Context } from '../contexts/context'
import { JustWebAppError } from '../errors'

export interface PluginModule<C, S> {
  activate(context: Context): Promise<[C, S?] | void>,
  start?: (startContext: S) => Promise<void>
}

export interface PluginsContext {
  addPlugin<A, C, S>(this: A, plugin: PluginModule<C, S>): C extends object ? Promise<A & C> : Promise<A>
}

export type PluginsClosure = readonly [PluginsContext, { loading: Array<Promise<[PluginModule<any, any>, any]>> }]

export interface PluginsContextOptions {
  context: Context
}

export function createPluginsClosure(options: PluginsContextOptions): PluginsClosure {
  const loading: Array<Promise<[PluginModule<any, any>, any]>> = []
  const pluginsContext = {
    async addPlugin(plugin: PluginModule<any, any>) {
      const p = plugin.activate(options.context)
      loading.push(p.then(result => [plugin, result?.[1]]))
      return p.then((result) => {
        if (!result) return this
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const [pluginContext] = result
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        if (!pluginContext) return this as any
        const keys = Object.keys(this)
        forEachKey(pluginContext, k => {
          if (typeof k === 'string' && keys.includes(k)) {
            throw new JustWebAppError(
              `unable to load plugin: it is overriding an existing property '${k}'`,
              // eslint-disable-next-line @typescript-eslint/unbound-method
              { ssf: pluginsContext.addPlugin })
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return { ...this, ...pluginContext }
      })
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [pluginsContext, { loading }] as any
}

export async function startPlugins({ logger, loading }: {
  logger: Logger,
  loading: Array<Promise<[PluginModule<any, any>, any]>>
}) {
  const entries = await Promise.all(loading)
  logger.notice('loading plugins...completed')
  await Promise.all(entries.map(([plugin, startContext]) => {
    if (plugin.start) return plugin.start(startContext)
  }))
  logger.notice('start plugins...completed')
}

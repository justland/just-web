import { JustWebError } from '@just-web/errors'
import { Adder, createStore, push, Store, withAdder } from '@just-web/states'
import { forEachKey } from 'type-plus'
import { Context } from '../contexts/context'
import { log } from '../log'

export interface PluginModule<M> {
  activate(context: Context): Promise<M>,
  start?: () => Promise<void>
}

export interface PluginsContext<A> {
  addPlugin<M>(this: A, plugin: PluginModule<M>): Promise<A & M>
}

export interface ReadonlyPluginsContext {
}

export interface PluginsContextOptions {
  context: Context
}

let plugins: Store<PluginModule<any>[]> & {
  add: Adder<PluginModule<any>>
}

const loading: Array<Promise<any>> = []

export function createPluginsContext<A>(options: PluginsContextOptions): PluginsContext<A> {
  plugins = withAdder(createStore<PluginModule<any>[]>([]), push)
  return {
    async addPlugin(plugin) {
      plugins.add(plugin)
      const p = plugin.activate(options.context)
        .then(m => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          if (!m) return this as any
          const keys = Object.keys(this)
          forEachKey(m, k => {
            if (typeof k === 'string' && keys.includes(k)) {
              throw new JustWebError(`unable to load plugin: it is overriding an existing property '${k}'`)
            }
          })
          return { ...this, ...m }
        })
      loading.push(p)
      return p
    },
  }
}

export async function startPlugins() {
  await Promise.all(loading)
  log.notice('loading plugins...completed')
  await Promise.all(plugins.get().map(p => {
    if (p.start) return p.start()
  }))
  log.notice('start plugins...completed')
}

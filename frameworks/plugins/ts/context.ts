import { Context, JustWebError } from '@just-web/contexts'
import { Adder, createStore, push, Store, withAdder } from '@just-web/states'
import { forEachKey } from 'type-plus'

export interface PluginModule<M> {
  activate(context: Context): Promise<M>
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

export function start() {
  return {
    loadingPlugins: Promise.all(loading)
  }
}

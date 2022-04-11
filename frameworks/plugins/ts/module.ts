import { Context } from '@just-web/contexts'
import { Adder, createStore, push, Store, withAdder } from '@just-web/states'

export interface PluginModule {
  activate(context: Context): void | Promise<void>
}

export interface Module {
  addPlugin(plugin: PluginModule): void
}

export interface ReadonlyModule {

}

export interface ModuleOptions {
  context: Context
}

let plugins: Store<PluginModule[]> & {
  add: Adder<PluginModule>
}

const loading: Array<Promise<void> | void> = []

export function create(options: ModuleOptions): Module {
  plugins = withAdder(createStore<PluginModule[]>([]), push)
  return {
    addPlugin(plugin: PluginModule) {
      plugins.add(plugin)
      loading.push(plugin.activate(options.context))
    },
  }
}

export function start() {
  return {
    loadingPlugins: Promise.all(loading)
  }
}

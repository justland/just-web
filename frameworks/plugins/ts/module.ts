import { Context } from '@just-web/contexts'
import { Adder, createStore, push, Store, withAdder } from '@just-web/states'

export interface Module {
  loadingPlugins: Promise<void[]>
}

export interface ReadonlyModule {

}

export interface ModuleOptions {
  context: Context
}

export interface PluginModule {
  activate(context: Context): Promise<void>
}
let plugins: Store<PluginModule[]> & {
  add: Adder<PluginModule>
}

export function createContext() {
  plugins = withAdder(createStore<PluginModule[]>([]), push)
  return {
    loadPlugin(module: PluginModule) {
      plugins.add(module)
    }
  }
}

function activatePlugins(context: Context) {
  return Promise.all(plugins.get().map(p => activatePlugin(context, p)))
}

function activatePlugin(context: Context, plugin: PluginModule) {
  return plugin.activate(context)
}

export function start(options: ModuleOptions): Module {
  return {
    loadingPlugins: activatePlugins(options.context)
  }
}

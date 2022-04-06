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

export function create(): Module {
  plugins = withAdder(createStore<PluginModule[]>([]), push)
  return {
    addPlugin(module: PluginModule) {
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

export function start(options: ModuleOptions) {
  return {
    loadingPlugins: activatePlugins(options.context)
  }
}

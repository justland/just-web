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

let ctx: Context

export function create(): Module {
  plugins = withAdder(createStore<PluginModule[]>([]), push)
  return {
    addPlugin(plugin: PluginModule) {
      plugins.add(plugin)
      if (ctx) {
        activatePlugin(ctx, plugin)
      }
    },
  }
}
function activatePlugins(context: Context) {
  ctx = context
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

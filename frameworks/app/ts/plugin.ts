import type { Plugin } from './plugin.types.js'

export function definePlugin<
	Static extends Plugin.AllPlugins<any, any, any> | void = void,
	Dynamic extends Record<string, Plugin.AllPlugins<any, any, any>> | void = void,
	Params extends any[] = [],
	RequiredPlugins extends any[] = [],
	OptionalPlugins extends any[] = [],
	PluginContext extends Record<string | symbol, any> = Record<string | symbol, any>
>(
	plugin: (...args: Params) => Plugin.TypeD<Static, Dynamic, RequiredPlugins, OptionalPlugins, PluginContext>
): typeof plugin
export function definePlugin<
	Static extends Plugin.AllPlugins<any, any, any> | void = void,
	Dynamic extends Record<string, Plugin.AllPlugins<any, any, any>> | void = void,
	Params extends any[] = [],
	RequiredPlugins extends any[] = [],
	PluginContext extends Record<string | symbol, any> = Record<string | symbol, any>
>(plugin: (...args: Params) => Plugin.TypeB<Static, Dynamic, RequiredPlugins, PluginContext>): typeof plugin
export function definePlugin<
	Static extends Plugin.AllPlugins<any, any, any> | void = void,
	Dynamic extends Record<string, Plugin.AllPlugins<any, any, any>> | void = void,
	Params extends any[] = [],
	OptionalPlugins extends any[] = [],
	PluginContext extends Record<string | symbol, any> = Record<string | symbol, any>
>(plugin: (...args: Params) => Plugin.TypeC<Static, Dynamic, OptionalPlugins, PluginContext>): typeof plugin
export function definePlugin<
	Static extends Plugin.AllPlugins<any, any, any> | void = void,
	Dynamic extends Record<string, Plugin.AllPlugins<any, any, any>> | void = void,
	Params extends any[] = [],
	PluginContext extends Record<string | symbol, any> = Record<string | symbol, any>
>(plugin: (...args: Params) => Plugin.TypeA<Static, Dynamic, PluginContext>): typeof plugin
export function definePlugin(plugin: unknown): typeof plugin {
	return plugin
}

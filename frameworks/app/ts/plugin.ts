import type { Plugin } from './plugin.types.js'

export function definePlugin<
	Dynamic extends Array<(...args: any[]) => Plugin<any, any, any>>,
	Params extends any[] = [],
	RequiredPlugins extends any[] = [],
	OptionalPlugins extends any[] = [],
	PluginContext extends Record<string | symbol, any> = Record<string | symbol, any>
>(plugin: (...args: Params) => Plugin.TypeD<RequiredPlugins, OptionalPlugins, PluginContext>): typeof plugin
export function definePlugin<
	Dynamic extends Array<(...args: any[]) => Plugin<any, any, any>>,
	Params extends any[] = [],
	RequiredPlugins extends any[] = [],
	PluginContext extends Record<string | symbol, any> = Record<string | symbol, any>
>(plugin: (...args: Params) => Plugin.TypeB<RequiredPlugins, PluginContext>): typeof plugin
export function definePlugin<
	Dynamic extends Array<(...args: any[]) => Plugin<any, any, any>>,
	Params extends any[] = [],
	OptionalPlugins extends any[] = [],
	PluginContext extends Record<string | symbol, any> = Record<string | symbol, any>
>(plugin: (...args: Params) => Plugin.TypeC<OptionalPlugins, PluginContext>): typeof plugin
export function definePlugin<
	Dynamic extends Array<(...args: any[]) => Plugin<any, any, any>>,
	Params extends any[] = [],
	PluginContext extends Record<string | symbol, any> = Record<string | symbol, any>
>(plugin: (...args: Params) => Plugin.TypeA<Dynamic, PluginContext>): typeof plugin
export function definePlugin(plugin: unknown): typeof plugin {
	return plugin
}

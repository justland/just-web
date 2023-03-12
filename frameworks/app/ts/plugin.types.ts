import type { UnionOfValues } from 'type-plus'

export namespace Plugin {
	export type PluginResultContext<P extends Plugin<any, any, any>> = Awaited<ReturnType<P['define']>>

	export type PluginBase = {
		name: string
	}
	export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
		? I
		: never

	export type DefineContexts<Plugins extends Array<() => Plugin<any, any, any>>> = UnionToIntersection<
		Awaited<ReturnType<ReturnType<UnionOfValues<Plugins>>['define']>>
	>

	export type DefineContext<P extends () => Plugin<any, any, any>> = UnionToIntersection<
		Awaited<ReturnType<ReturnType<P>['define']>>
	>

	export type TypeA<
		Dynamic extends Array<(...args: any[]) => Plugin<any, any, any>>,
		PluginContext extends Record<string | symbol, any>
	> = PluginBase & {
		define(ctx: Loader): Promise<PluginContext>
	}

	export type TypeB<
		RequiredPlugins extends Array<() => Plugin<any, any, any>>,
		PluginContext extends Record<string | symbol, any>
	> = PluginBase & {
		required: RequiredPlugins
		define(ctx: Loader & DefineContexts<RequiredPlugins>): Promise<PluginContext>
	}

	export type TypeC<
		OptionalPlugins extends Array<() => Plugin<any, any, any>>,
		PluginContext extends Record<string | symbol, any>
	> = PluginBase & {
		optional: OptionalPlugins
		define(ctx: Loader & Partial<DefineContexts<OptionalPlugins>>): Promise<PluginContext>
	}

	export type TypeD<
		RequiredPlugins extends Array<() => Plugin<any, any, any>>,
		OptionalPlugins extends Array<() => Plugin<any, any, any>>,
		PluginContext extends Record<string | symbol, any>
	> = PluginBase & {
		required: RequiredPlugins
		optional: OptionalPlugins
		define(
			ctx: Loader & DefineContexts<RequiredPlugins> & Partial<DefineContexts<OptionalPlugins>>
		): Promise<PluginContext>
	}

	export type Loader = {
		load<P extends (...args: any[]) => Plugin<any, any, any>>(
			identifier: string
		): Promise<Plugin.DefineContext<P>>
	}
}

export type Plugin<
	Dynamic extends Array<(...args: any[]) => Plugin<any, any, any>>,
	PluginContext extends Record<string | symbol, any>,
	RequiredPlugins extends Array<() => Plugin<any, any, any>> = [],
	OptionalPlugins extends Array<() => Plugin<any, any, any>> = []
> =
	| Plugin.TypeA<Dynamic, PluginContext>
	| Plugin.TypeB<RequiredPlugins, PluginContext>
	| Plugin.TypeC<OptionalPlugins, PluginContext>
	| Plugin.TypeD<RequiredPlugins, OptionalPlugins, PluginContext>

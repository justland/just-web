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

	export type DefineContext<P extends (...args: any[]) => Plugin<any, any, any>> = UnionToIntersection<
		Awaited<ReturnType<ReturnType<P>['define']>>
	>

	export type TypeA<
		Dynamic extends Record<string, (...args: any[]) => Plugin<any, any, any>> | undefined,
		PluginContext extends Record<string | symbol, any>
	> = PluginBase & {
		define(ctx: Loader<Dynamic>): Promise<PluginContext>
	}

	export type TypeB<
		Dynamic extends Record<string, (...args: any[]) => Plugin<any, any, any>> | undefined,
		RequiredPlugins extends Array<() => Plugin<any, any, any>>,
		PluginContext extends Record<string | symbol, any>
	> = PluginBase & {
		required: RequiredPlugins
		define(ctx: Loader<Dynamic> & DefineContexts<RequiredPlugins>): Promise<PluginContext>
	}

	export type TypeC<
		Dynamic extends Record<string, (...args: any[]) => Plugin<any, any, any>> | undefined,
		OptionalPlugins extends Array<() => Plugin<any, any, any>>,
		PluginContext extends Record<string | symbol, any>
	> = PluginBase & {
		optional: OptionalPlugins
		define(ctx: Loader<Dynamic> & Partial<DefineContexts<OptionalPlugins>>): Promise<PluginContext>
	}

	export type TypeD<
		Dynamic extends Record<string, (...args: any[]) => Plugin<any, any, any>> | undefined,
		RequiredPlugins extends Array<() => Plugin<any, any, any>>,
		OptionalPlugins extends Array<() => Plugin<any, any, any>>,
		PluginContext extends Record<string | symbol, any>
	> = PluginBase & {
		required: RequiredPlugins
		optional: OptionalPlugins
		define(
			ctx: Loader<Dynamic> & DefineContexts<RequiredPlugins> & Partial<DefineContexts<OptionalPlugins>>
		): Promise<PluginContext>
	}

	export type Loader<Dynamic extends Record<string, (...args: any[]) => Plugin<any, any, any>> | undefined> =
		Dynamic extends Record<string, (...args: any[]) => Plugin<any, any, any>>
			? {
					load<I extends keyof Dynamic>(identifier: I): Promise<Plugin.DefineContext<Dynamic[I]>>
			  }
			: unknown
}

export type Plugin<
	Dynamic extends Record<string, (...args: any[]) => Plugin<any, any, any>>,
	PluginContext extends Record<string | symbol, any>,
	RequiredPlugins extends Array<() => Plugin<any, any, any>> = [],
	OptionalPlugins extends Array<() => Plugin<any, any, any>> = []
> =
	| Plugin.TypeA<Dynamic, PluginContext>
	| Plugin.TypeB<Dynamic, RequiredPlugins, PluginContext>
	| Plugin.TypeC<Dynamic, OptionalPlugins, PluginContext>
	| Plugin.TypeD<Dynamic, RequiredPlugins, OptionalPlugins, PluginContext>

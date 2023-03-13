import type { UnionOfValues } from 'type-plus'

export namespace Plugin {
	export type PluginResultContext<P extends AllPlugins<any, any, any> | void> = P extends AllPlugins<
		any,
		any,
		any
	>
		? Awaited<ReturnType<ReturnType<P>['define']>>
		: unknown

	export type PluginBase = {
		name: string
		start?: Promise<void>
	}
	export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
		? I
		: never

	export type DefineContexts<Plugins extends Array<AllPlugins<any, any, any>>> = UnionToIntersection<
		Awaited<ReturnType<ReturnType<UnionOfValues<Plugins>>['define']>>
	>

	export type TypeA<
		Static extends AllPlugins<any, any, any> | void,
		Dynamic extends Record<string, AllPlugins<any, any, any>> | void,
		PluginContext extends Record<string | symbol, any>
	> = PluginBase & {
		define(ctx: Loader<Dynamic> & PluginResultContext<Static>): Promise<PluginContext>
	}

	export type TypeB<
		Static extends AllPlugins<any, any, any> | void,
		Dynamic extends Record<string, AllPlugins<any, any, any>> | void,
		RequiredPlugins extends Array<AllPlugins<any, any, any>>,
		PluginContext extends Record<string | symbol, any>
	> = PluginBase & {
		required: RequiredPlugins
		define(
			ctx: Loader<Dynamic> & PluginResultContext<Static> & DefineContexts<RequiredPlugins>
		): Promise<PluginContext>
	}

	export type TypeC<
		Static extends AllPlugins<any, any, any> | void,
		Dynamic extends Record<string, AllPlugins<any, any, any>> | void,
		OptionalPlugins extends Array<AllPlugins<any, any, any>>,
		PluginContext extends Record<string | symbol, any>
	> = PluginBase & {
		optional: OptionalPlugins
		define(
			ctx: Loader<Dynamic> & PluginResultContext<Static> & Partial<DefineContexts<OptionalPlugins>>
		): Promise<PluginContext>
	}

	export type TypeD<
		Static extends AllPlugins<any, any, any> | void,
		Dynamic extends Record<string, AllPlugins<any, any, any>> | void,
		RequiredPlugins extends Array<AllPlugins<any, any, any>>,
		OptionalPlugins extends Array<AllPlugins<any, any, any>>,
		PluginContext extends Record<string | symbol, any>
	> = PluginBase & {
		required: RequiredPlugins
		optional: OptionalPlugins
		define(
			ctx: Loader<Dynamic> &
				PluginResultContext<Static> &
				DefineContexts<RequiredPlugins> &
				Partial<DefineContexts<OptionalPlugins>>
		): Promise<PluginContext>
	}

	export type Loader<Dynamic extends Record<string, AllPlugins<any, any, any>> | void> =
		Dynamic extends Record<string, AllPlugins<any, any, any>>
			? {
					load<I extends keyof Dynamic>(identifier: I): Promise<PluginContext<Dynamic[I]>>
			  }
			: unknown

	export type AllPlugins<
		Static extends AllPlugins<any, any, any> | void = void,
		Dynamic extends Record<string, AllPlugins<any, any, any>> | void = void,
		Params extends any[] = [],
		RequiredPlugins extends Array<AllPlugins<any, any, any>> = [],
		OptionalPlugins extends Array<AllPlugins<any, any, any>> = [],
		PluginContext extends Record<string | symbol, any> = Record<string | symbol, any>
	> = (
		...args: Params
	) =>
		| Plugin.TypeA<Static, Dynamic, PluginContext>
		| Plugin.TypeB<Static, Dynamic, RequiredPlugins, PluginContext>
		| Plugin.TypeC<Static, Dynamic, OptionalPlugins, PluginContext>
		| Plugin.TypeD<Static, Dynamic, RequiredPlugins, OptionalPlugins, PluginContext>
}

export type Plugin<PluginContext extends Record<string | symbol, any> = Record<string | symbol, any>> =
	Plugin.AllPlugins<void, void, [], [], [], PluginContext>

/**
 * Gets the `PluginContext` type from the plugin.
 * @return The `PluginContext` or `never`
 */
export type PluginContext<P extends Plugin.AllPlugins<any, any, any>> = Plugin.UnionToIntersection<
	Awaited<ReturnType<ReturnType<P>['define']>>
>

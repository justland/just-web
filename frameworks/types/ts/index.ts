import type { GetLogger, Logger } from 'standard-log'
import type { AnyFunction, Omit } from 'type-plus'

/* eslint-disable @typescript-eslint/no-unused-vars */
export type AppBaseContext = { name: string; id: string }

export type StartContext = { log: Omit<Logger, 'id' | 'level' | 'write'> & { getLogger: GetLogger } }

/**
 * This PluginModule namespace describes the key exports within your module.
 * The `_B`/`_C` are function overload which you can ignore.
 * You can also expose other exports which the consuming code can reference them directly by importing your module.
 */
export namespace PluginModule {
  export type PluginModuleBase = {
    /**
     * Name of the plugin.
     */
    name: string
  }

  /**
   * TypeA are plugins that does not return a `PluginContext`
   */
  export type TypeA<NeedContext extends Record<string | symbol, any>> = PluginModuleBase & {
    init: (context: NeedContext) => void
  }

  /**
   * TypeA are plugins that does not return a `PluginContext`
   */
  export type TypeA_WithStart<NeedContext extends Record<string | symbol, any>> = PluginModuleBase & {
    init: (context: NeedContext) => void
    start: (ctx: StartContext) => void | Promise<void>
  }

  /**
   * TypeB are plugins with `PluginContext` but no `StartContext`.
   */
  export type TypeB<
    NeedContext extends Record<string | symbol, any>,
    PluginContext extends Record<string | symbol, any>
  > = PluginModuleBase & {
    init: (context: NeedContext) => [PluginContext]
  }

  /**
   * TypeB are plugins with `PluginContext` but no `StartContext`.
   */
  export type TypeB_WithStart<
    NeedContext extends Record<string | symbol, any>,
    PluginContext extends Record<string | symbol, any>
  > = PluginModuleBase & {
    init: (context: NeedContext) => [PluginContext]
    start: (ctx: StartContext) => void | Promise<void>
  }
}

export type PluginModule<
  NeedContext extends Record<string | symbol, any> = Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any> = Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any> = Record<string | symbol, any>
> =
  | PluginModule.TypeA<NeedContext>
  | PluginModule.TypeA_WithStart<NeedContext>
  | PluginModule.TypeB<NeedContext, PluginContext>
  | PluginModule.TypeB_WithStart<NeedContext, PluginContext>

/**
 * Gets the `PluginContext` type from the plugin.
 * @return The `PluginContext` or `never`
 */
export type PluginContext<P extends AnyFunction> = ReturnType<ReturnType<P>['init']>[0] extends infer R
  ? unknown extends R
    ? never
    : R
  : never

/**
 * Typed helper to define a `just-web` plugin.
 *
 * @note due to an issue with TypeScript,
 * the function `init()` and `start()` needs to be defined as an arrow function.
 * If not, the type can't be inferred correctly.
 */
export function definePlugin<
  Params extends any[],
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>
>(plugin: (...args: Params) => PluginModule.TypeB_WithStart<NeedContext, PluginContext>): typeof plugin
/**
 * Typed helper to define a `just-web` plugin.
 *
 * @note due to an issue with TypeScript,
 * the function `init()` and `start()` needs to be defined as an arrow function.
 * If not, the type can't be inferred correctly.
 */
export function definePlugin<
  Params extends any[],
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>
>(plugin: (...args: Params) => PluginModule.TypeB<NeedContext, PluginContext>): typeof plugin
/**
 * Typed helper to define a `just-web` plugin.
 *
 * @note due to an issue with TypeScript,
 * the function `init()` and `start()` needs to be defined as an arrow function.
 * If not, the type can't be inferred correctly.
 */
export function definePlugin<Params extends any[], NeedContext extends Record<string | symbol, any>>(
  plugin: (...args: Params) => PluginModule.TypeA_WithStart<NeedContext>
): typeof plugin
/**
 * Typed helper to define a `just-web` plugin.
 *
 * @note due to an issue with TypeScript,
 * the function `init()` and `start()` needs to be defined as an arrow function.
 * If not, the type can't be inferred correctly.
 */
export function definePlugin<NeedContext extends Record<string | symbol, any>>(
  plugin: (...args: any[]) => PluginModule.TypeA<NeedContext>
): typeof plugin
export function definePlugin<
  Params extends any[],
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>
>(
  plugin: (
    ...args: Params
  ) => PluginModule.TypeB<NeedContext, PluginContext> | PluginModule.TypeA<NeedContext>
) {
  return plugin
}

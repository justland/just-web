import { getLogger, Logger } from 'standard-log'
import { AnyFunction, LeftJoin, Omit } from 'type-plus'

/* eslint-disable @typescript-eslint/no-unused-vars */
export type AppBaseContext = { name: string, id: string }

export type StartContextBase = { log: Omit<Logger, 'id' | 'level' | 'write'> & { getLogger: typeof getLogger } }

/**
 * This PluginModule namespace describes the key exports within your module.
 * The `_B`/`_C` are function overload which you can ignore.
 * You can also expose other exports which the consuming code can reference them directly by importing your module.
 */
export namespace PluginModule {
  /**
   * `initialize()` function gets the `context` it needs from the application,
   * and returns two things:
   *
   * `PluginContext` which will be added to the application instance.
   * `StartContext` which will be passed to the `start()` function if present.
   *
   * These types are inferred automatically so you don't need to specify them explicitly.
   */
  export type initialize<
    in NeedContext extends Record<string | symbol, any>,
    PluginContext extends Record<string | symbol, any> | undefined,
    StartContext extends Record<string | symbol, any> | undefined
  > = (context: NeedContext) => [PluginContext, StartContext?]
  /**
   * @deprecated StartContext will be deprecated. Use closure to pass value to your `start()` instead.
   */
  export type initialize_B<
    in NeedContext extends Record<string | symbol, any>,
    StartContext extends Record<string | symbol, any> | undefined
  > = (context: NeedContext) => [undefined, StartContext]
  /**
   * Initialize plugin that does not add any API to the application,
   * and do not have a `start()` context?
   */
  export type initialize_C<
    in NeedContext extends Record<string | symbol, any>
  > = (context: NeedContext) => void

  export type initializeForTest<
    in NeedContext extends Record<string | symbol, any>,
    PluginContext extends Record<string | symbol, any> | undefined,
    StartContext extends Record<string | symbol, any> | undefined
  > = (context?: NeedContext) => [PluginContext, StartContext?]
  export type initializeForTest_B<
    in NeedContext extends Record<string | symbol, any>,
    StartContext extends Record<string | symbol, any> | undefined
  > = (context?: NeedContext) => [undefined, StartContext?]
  export type initializeForTest_C<
    in NeedContext extends Record<string | symbol, any>
  > = (context?: NeedContext) => void

  /**
   * `start()` function is an optional function that if present,
   * will be invoked when the application starts.
   *
   * This is a good time to start or complete any work needed before the application is being used.
   *
   * @param context THIS WILL BE DEPRECATED. Use closure to pass value to your `start()` instead.
   */
  export type start<
    in StartContext extends Record<string | symbol, any>
  > = (context: StartContext) => Promise<void>


  export type PluginModuleBase = {
    /**
     * Name of the plugin.
     */
    name: string
  }

  /**
   * TypeA are plugins that does not return a `PluginContext`
   */
  export type TypeA<
    NeedContext extends Record<string | symbol, any>
  > = PluginModuleBase & ({
    init: (context: NeedContext) => void,
  })

  /**
   * TypeA are plugins that does not return a `PluginContext`
   */
  export type TypeA_WithStart<
    NeedContext extends Record<string | symbol, any>,
  > = PluginModuleBase & ({
    init: (context: NeedContext) => void,
    start: (ctx: StartContextBase) => void | Promise<void>
  })

  /**
   * TypeB are plugins with `PluginContext` but no `StartContext`.
   */
  export type TypeB<
    NeedContext extends Record<string | symbol, any>,
    PluginContext extends Record<string | symbol, any>,
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
    init: (context: NeedContext) => [PluginContext],
    start: (ctx: StartContextBase) => void | Promise<void>
  }

  /**
   * TypeC are plugins with `StartContext` but no `PluginContext`.
   * @deprecated StartContext will be deprecated. Use closure to pass value to your `start()` instead.
   */
  export type TypeC<
    NeedContext extends Record<string | symbol, any>,
    StartContext extends Record<string | symbol, any>
  > = PluginModuleBase & {
    init: (context: NeedContext) => [undefined, StartContext],
    start: (context: LeftJoin<StartContextBase, StartContext>) => void | Promise<void>,
  }

  /**
   * TypeD are plugins with both `PluginContext` and `StartContext`.
   * @deprecated StartContext will be deprecated. Use closure to pass value to your `start()` instead.
   */
  export type TypeD<
    NeedContext extends Record<string | symbol, any>,
    PluginContext extends Record<string | symbol, any>,
    StartContext extends Record<string | symbol, any>
  > = PluginModuleBase & {
    init: (context: NeedContext) => [PluginContext, StartContext],
    start: (context: LeftJoin<StartContextBase, StartContext>) => void | Promise<void>,
  }
}

export type PluginModule<
  NeedContext extends Record<string | symbol, any> = Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any> = Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any> = Record<string | symbol, any>
> = PluginModule.TypeA<NeedContext>
  | PluginModule.TypeA_WithStart<NeedContext>
  | PluginModule.TypeB<NeedContext, PluginContext>
  | PluginModule.TypeB_WithStart<NeedContext, PluginContext>
  | PluginModule.TypeC<NeedContext, StartContext>
  | PluginModule.TypeD<NeedContext, PluginContext, StartContext>

/**
 * Gets the `PluginContext` type from the plugin.
 * @return The `PluginContext` or `never`
 */
export type PluginContext<P extends AnyFunction> = ReturnType<ReturnType<P>['init']>[0] extends infer R
  ? (unknown extends R ? never : R) : never

/**
* Typed helper to define the `initialize()` function.
*
* `initialize()` function gets the `context` it needs from the application,
* and returns two things:
*
* `PluginContext` which will be added to the application instance.
* `StartContext` which will be passed to the `start()` function if present.
*
* These types are inferred automatically so you don't need to specify them explicitly.
*/
export function defineInitialize<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
>(
  initialize: PluginModule.initialize<NeedContext, PluginContext, StartContext>
): typeof initialize
/**
 * @deprecated StartContext will be deprecated. Use closure to pass value to your `start()` instead.
 */
export function defineInitialize<
  NeedContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
>(
  initialize: PluginModule.initialize_B<NeedContext, StartContext>
): typeof initialize
export function defineInitialize<
  NeedContext extends Record<string | symbol, any>
>(
  initialize: PluginModule.initialize_C<NeedContext>
): typeof initialize
export function defineInitialize<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
>(
  initialize:
    PluginModule.initialize<NeedContext, PluginContext, StartContext> |
    PluginModule.initialize_B<NeedContext, StartContext> |
    PluginModule.initialize_C<NeedContext>
) {
  return initialize
}

export function defineInitializeForTest<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
>(
  initialize: PluginModule.initializeForTest<NeedContext, PluginContext, StartContext>
): typeof initialize
export function defineInitializeForTest<
  NeedContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
>(
  initialize: PluginModule.initializeForTest_B<NeedContext, StartContext>
): typeof initialize
export function defineInitializeForTest<
  NeedContext extends Record<string | symbol, any>
>(
  initialize: PluginModule.initializeForTest_C<NeedContext>
): typeof initialize
export function defineInitializeForTest<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
>(
  initialize:
    PluginModule.initialize<NeedContext, PluginContext, StartContext> |
    PluginModule.initialize_B<NeedContext, StartContext> |
    PluginModule.initialize_C<NeedContext>
) {
  return initialize
}

/**
 * Typed helper to define the `start()` function.
 *
 * `start()` function is an optional function that if present,
 * will be invoked when the application starts.
 *
 * This is a good time to start or complete any work needed before the application is being used.
 */
export function defineStart<
  StartContext extends Record<string | symbol, any>
>(start: PluginModule.start<StartContext>) {
  return start
}

/**
 * Typed helper to define a `just-web` plugin.
 *
 * @deprecated StartContext will be deprecated. Use closure to pass value to your `start()` instead.
 * @note due to an issue with TypeScript,
 * the function `init()` and `start()` needs to be defined as an arrow function.
 * If not, the type can't be inferred correctly.
 */
export function definePlugin<
  Params extends any[],
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
>(plugin: (...args: Params) => PluginModule.TypeD<NeedContext, PluginContext, StartContext>): typeof plugin
/**
 * Typed helper to define a `just-web` plugin.
 *
 * @deprecated StartContext will be deprecated. Use closure to pass value to your `start()` instead.
 * @note due to an issue with TypeScript,
 * the function `init()` and `start()` needs to be defined as an arrow function.
 * If not, the type can't be inferred correctly.
 */
export function definePlugin<
  Params extends any[],
  NeedContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
>(plugin: (...args: Params) => PluginModule.TypeC<NeedContext, StartContext>): typeof plugin
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
  PluginContext extends Record<string | symbol, any>,
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
  PluginContext extends Record<string | symbol, any>,
>(plugin: (...args: Params) => PluginModule.TypeB<NeedContext, PluginContext>): typeof plugin
/**
 * Typed helper to define a `just-web` plugin.
 *
 * @note due to an issue with TypeScript,
 * the function `init()` and `start()` needs to be defined as an arrow function.
 * If not, the type can't be inferred correctly.
 */
export function definePlugin<
  Params extends any[],
  NeedContext extends Record<string | symbol, any>
>(plugin: (...args: Params) => PluginModule.TypeA_WithStart<NeedContext>): typeof plugin
/**
 * Typed helper to define a `just-web` plugin.
 *
 * @note due to an issue with TypeScript,
 * the function `init()` and `start()` needs to be defined as an arrow function.
 * If not, the type can't be inferred correctly.
 */
export function definePlugin<NeedContext extends Record<string | symbol, any>>(plugin: (...args: any[]) => PluginModule.TypeA<NeedContext>): typeof plugin
export function definePlugin<
  Params extends any[],
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
>(plugin: (...args: Params) => PluginModule.TypeD<NeedContext, PluginContext, StartContext> |
  PluginModule.TypeC<NeedContext, StartContext> |
  PluginModule.TypeB<NeedContext, PluginContext> |
  PluginModule.TypeA<NeedContext>) {
  return plugin
}

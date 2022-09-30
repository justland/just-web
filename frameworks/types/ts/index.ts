// import { AsyncContext } from 'async-fp'

// May not need.
// Core framework module maybe able to use the same PluginModule type
// export type FrameworkModule = {
//   extendContext: AsyncContext.Transformer<any, any>,
//   start<StartContext extends Record<string | symbol, any>>(context: StartContext): Promise<void>
// }

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
    > = (context: NeedContext) => Promise<[PluginContext, StartContext?]>
  export type initialize_B<
    in NeedContext extends Record<string | symbol, any>,
    StartContext extends Record<string | symbol, any> | undefined
    > = (context: NeedContext) => Promise<[undefined, StartContext?]>
  export type initialize_C<
    in NeedContext extends Record<string | symbol, any>
    > = (context: NeedContext) => Promise<[]>

  export type initializeForTest<
    in NeedContext extends Record<string | symbol, any>,
    PluginContext extends Record<string | symbol, any> | undefined,
    StartContext extends Record<string | symbol, any> | undefined
    > = (context?: NeedContext) => Promise<[PluginContext, StartContext?]>
  export type initializeForTest_B<
    in NeedContext extends Record<string | symbol, any>,
    StartContext extends Record<string | symbol, any> | undefined
    > = (context?: NeedContext) => Promise<[undefined, StartContext?]>
  export type initializeForTest_C<
    in NeedContext extends Record<string | symbol, any>
    > = (context?: NeedContext) => Promise<[]>

  /**
   * `start()` function is an optional function that if present,
   * will be invoked when the application starts.
   *
   * This is a good time to start or complete any work needed before the application is being used.
   */
  export type start<
    in StartContext extends Record<string | symbol, any>
    > = (context: StartContext) => Promise<void>
}

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

export type PluginModule<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
  > = {
    init: PluginModule.initialize<NeedContext, PluginContext, StartContext> |
    PluginModule.initialize_B<NeedContext, StartContext> |
    PluginModule.initialize_C<NeedContext>,
    start?: PluginModule.start<StartContext>,
    initForTest?: PluginModule.initializeForTest<NeedContext, PluginContext, StartContext> |
    PluginModule.initializeForTest_B<NeedContext, StartContext> |
    PluginModule.initializeForTest_C<NeedContext>,
  }

/**
 * Typed helper to define a just-web plugin.
 */
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
>(plugin: PluginModule<NeedContext, PluginContext, StartContext>) {
  return plugin
}

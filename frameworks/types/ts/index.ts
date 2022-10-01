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
    > = (context: NeedContext) => Promise<[undefined, StartContext]>
  export type initialize_C<
    in NeedContext extends Record<string | symbol, any>
    > = (context: NeedContext) => Promise<void>

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
    > = (context?: NeedContext) => Promise<void>

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

export type PluginModule_A<
  NeedContext extends Record<string | symbol, any>
  > = {
    init: (context: NeedContext) => Promise<void>
  }

export type PluginModule_A_WithTest<
  NeedContext extends Record<string | symbol, any>
  > = {
    init: (context: NeedContext) => Promise<void>,
    initForTest: (context: NeedContext) => Promise<void>
  }

export type PluginModule_A_WithTestContext<
  NeedContext extends Record<string | symbol, any>,
  TestPluginContext extends Record<string | symbol, any>
  > = {
    init: (context: NeedContext) => Promise<void>,
    initForTest: (context: NeedContext) => Promise<[TestPluginContext]>
  }

export type PluginModule_B<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>
  > = {
    init: (context: NeedContext) => Promise<[PluginContext]>
  }

export type PluginModule_B_WithTestContext<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  TestPluginContext extends PluginContext
  > = {
    init: (context: NeedContext) => Promise<[PluginContext]>,
    initForTest: (context: NeedContext) => Promise<[TestPluginContext]>,
  }

export type PluginModule_C<
  NeedContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
  > = {
    init: (context: NeedContext) => Promise<[undefined, StartContext]>,
    start: (context: StartContext) => Promise<void>,
  }

export type PluginModule_C_WithTest<
  NeedContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
  > = {
    init: (context: NeedContext) => Promise<[undefined, StartContext]>,
    start: (context: StartContext) => Promise<void>,
    initForTest: (context: NeedContext) => Promise<[undefined, StartContext]>,
  }

export type PluginModule_C_WithTestContext<
  NeedContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
  TestPluginContext extends Record<string | symbol, any>
  > = {
    init: (context: NeedContext) => Promise<[undefined, StartContext]>,
    start: (context: StartContext) => Promise<void>,
    initForTest: (context: NeedContext) => Promise<[TestPluginContext, StartContext]>,
  }

export type PluginModule_D<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
  > = {
    init: (context: NeedContext) => Promise<[PluginContext, StartContext]>,
    start: (context: StartContext) => Promise<void>,
  }

export type PluginModule_D_WithTestContext<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
  TestPluginContext extends PluginContext
  > = {
    init: (context: NeedContext) => Promise<[PluginContext, StartContext]>,
    start: (context: StartContext) => Promise<void>,
    initForTest: (context: NeedContext) => Promise<[TestPluginContext, StartContext]>,
  }

/**
 * Typed helper to define a just-web plugin.
 */
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
  TestPluginContext extends PluginContext
>(
  plugin: PluginModule_D_WithTestContext<NeedContext, PluginContext, StartContext, TestPluginContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
  >(
    plugin: PluginModule_D<NeedContext, PluginContext, StartContext>
  ): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  TestPluginContext extends PluginContext
>(
  plugin: PluginModule_B_WithTestContext<NeedContext, PluginContext, TestPluginContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  >(
    plugin: PluginModule_B<NeedContext, PluginContext>
  ): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
>(
  plugin: PluginModule_C_WithTest<NeedContext, StartContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
  TestPluginContext extends Record<string | symbol, any>,
  >(
    plugin: PluginModule_C_WithTestContext<NeedContext, StartContext, TestPluginContext>
  ): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
  >(
    plugin: PluginModule_C<NeedContext, StartContext>
  ): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  TestPluginContext extends Record<string | symbol, any>
>(
  plugin: PluginModule_A_WithTestContext<NeedContext, TestPluginContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  >(
    plugin: PluginModule_A_WithTest<NeedContext>
  ): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  >(
    plugin: PluginModule_A<NeedContext>
  ): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
  >(plugin: PluginModule_D<NeedContext, PluginContext, StartContext> |
    PluginModule_C<NeedContext, StartContext> |
    PluginModule_B<NeedContext, PluginContext> |
    PluginModule_A<NeedContext>) {
  return plugin
}

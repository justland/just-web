/* eslint-disable @typescript-eslint/no-unused-vars */
export type AppBaseContext = { name: string }

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

  export type TypeA<
    NeedContext extends Record<string | symbol, any>
  > = PluginModuleBase & ({
    init: (context: NeedContext) => void,
  })

  export type TypeA_WithStart<
    NeedContext extends Record<string | symbol, any>
  > = PluginModuleBase & ({
    init: (context: NeedContext) => void,
    start: () => Promise<void>
  })

  export type TypeA_WithStartAndTest<
    NeedContext extends Record<string | symbol, any>,
  > = PluginModuleBase & {
    init: (context: NeedContext) => void,
    initForTest: (context: NeedContext) => void,
    start: () => Promise<void>
  }

  export type TypeA_WithTest<
    NeedContext extends Record<string | symbol, any>,
  > = PluginModuleBase & {
    init: (context: NeedContext) => void,
    initForTest: (context: NeedContext) => void
  }

  export type TypeA_WithTestContext<
    NeedContext extends Record<string | symbol, any>,
    TestPluginContext extends Record<string | symbol, any>
  > = PluginModuleBase & {
    init: (context: NeedContext) => void,
    initForTest: (context: NeedContext) => [TestPluginContext]
  }

  export type TypeB<
    NeedContext extends Record<string | symbol, any>,
    PluginContext extends Record<string | symbol, any>,
    _StartContext extends void
  > = PluginModuleBase & {
    init: (context: NeedContext) => [PluginContext]
  }

  export type TypeB_WithStart<
    NeedContext extends Record<string | symbol, any>,
    PluginContext extends Record<string | symbol, any>
  > = PluginModuleBase & {
    init: (context: NeedContext) => [PluginContext],
    start: () => Promise<void>
  }

  export type TypeB_WithStartAndTestContext<
    NeedContext extends Record<string | symbol, any>,
    PluginContext extends Record<string | symbol, any>,
    TestPluginContext extends PluginContext
  > = PluginModuleBase & {
    init: (context: NeedContext) => [PluginContext],
    initForTest: (context: NeedContext) => [TestPluginContext],
    start: () => Promise<void>
  }

  export type TypeB_WithTestContext<
    NeedContext extends Record<string | symbol, any>,
    PluginContext extends Record<string | symbol, any>,
    TestPluginContext extends PluginContext
  > = PluginModuleBase & {
    init: (context: NeedContext) => [PluginContext],
    initForTest: (context: NeedContext) => [TestPluginContext],
  }

  export type TypeC<
    NeedContext extends Record<string | symbol, any>,
    StartContext extends Record<string | symbol, any>
  > = PluginModuleBase & {
    init: (context: NeedContext) => [undefined, StartContext],
    start: (context: StartContext) => Promise<void>,
  }

  export type TypeC_WithTest<
    NeedContext extends Record<string | symbol, any>,
    StartContext extends Record<string | symbol, any>,
  > = PluginModuleBase & {
    init: (context: NeedContext) => [undefined, StartContext],
    initForTest: (context: NeedContext) => [undefined, StartContext],
    start: (context: StartContext) => Promise<void>,
  }

  export type TypeC_WithTestContext<
    NeedContext extends Record<string | symbol, any>,
    StartContext extends Record<string | symbol, any>,
    TestPluginContext extends Record<string | symbol, any>
  > = PluginModuleBase & {
    init: (context: NeedContext) => [undefined, StartContext],
    initForTest: (context: NeedContext) => [TestPluginContext, StartContext],
    start: (context: StartContext) => Promise<void>,
  }

  export type TypeD<
    NeedContext extends Record<string | symbol, any>,
    PluginContext extends Record<string | symbol, any>,
    StartContext extends Record<string | symbol, any>
  > = PluginModuleBase & {
    init: (context: NeedContext) => [PluginContext, StartContext],
    start: (context: StartContext) => Promise<void>,
  }

  export type TypeD_WithTestContext<
    NeedContext extends Record<string | symbol, any>,
    PluginContext extends Record<string | symbol, any>,
    StartContext extends Record<string | symbol, any>,
    TestPluginContext extends PluginContext
  > = PluginModuleBase & {
    init: (context: NeedContext) => [PluginContext, StartContext],
    initForTest: (context: NeedContext) => [TestPluginContext, StartContext],
    start: (context: StartContext) => Promise<void>,
  }
}

export type PluginModule<
  NeedContext extends Record<string | symbol, any> = Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any> = Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any> = Record<string | symbol, any>,
  TestPluginContext extends PluginContext = PluginContext
> = PluginModule.TypeA<NeedContext>
  | PluginModule.TypeA_WithStart<NeedContext>
  | PluginModule.TypeA_WithStartAndTest<NeedContext>
  | PluginModule.TypeA_WithTest<NeedContext>
  | PluginModule.TypeA_WithTestContext<NeedContext, TestPluginContext>
  | PluginModule.TypeB<NeedContext, PluginContext, void>
  | PluginModule.TypeB_WithStart<NeedContext, PluginContext>
  | PluginModule.TypeB_WithStartAndTestContext<NeedContext, PluginContext, TestPluginContext>
  | PluginModule.TypeB_WithTestContext<NeedContext, PluginContext, TestPluginContext>
  | PluginModule.TypeC<NeedContext, StartContext>
  | PluginModule.TypeC_WithTest<NeedContext, StartContext>
  | PluginModule.TypeC_WithTestContext<NeedContext, StartContext, TestPluginContext>
  | PluginModule.TypeD<NeedContext, PluginContext, StartContext>
  | PluginModule.TypeD_WithTestContext<NeedContext, PluginContext, StartContext, TestPluginContext>

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

/**
 * Typed helper to define a just-web plugin.
 */
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
  TestPluginContext extends PluginContext
>(
  plugin: PluginModule.TypeD_WithTestContext<NeedContext, PluginContext, StartContext, TestPluginContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
>(
  plugin: PluginModule.TypeD<NeedContext, PluginContext, StartContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
>(
  plugin: PluginModule.TypeC_WithTest<NeedContext, StartContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
  TestPluginContext extends Record<string | symbol, any>,
>(
  plugin: PluginModule.TypeC_WithTestContext<NeedContext, StartContext, TestPluginContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
>(
  plugin: PluginModule.TypeC<NeedContext, StartContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  TestPluginContext extends PluginContext
>(
  plugin: PluginModule.TypeB_WithStartAndTestContext<NeedContext, PluginContext, TestPluginContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  TestPluginContext extends PluginContext
>(
  plugin: PluginModule.TypeB_WithTestContext<NeedContext, PluginContext, TestPluginContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
>(
  plugin: PluginModule.TypeB_WithStart<NeedContext, PluginContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
>(
  plugin: PluginModule.TypeB<NeedContext, PluginContext, void>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  TestPluginContext extends Record<string | symbol, any>
>(
  plugin: PluginModule.TypeA_WithTestContext<NeedContext, TestPluginContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
>(
  plugin: PluginModule.TypeA_WithStartAndTest<NeedContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
>(
  plugin: PluginModule.TypeA_WithTest<NeedContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
>(
  plugin: PluginModule.TypeA_WithStart<NeedContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
>(
  plugin: PluginModule.TypeA<NeedContext>
): typeof plugin
export function definePlugin<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>,
>(plugin: PluginModule.TypeD<NeedContext, PluginContext, StartContext> |
  PluginModule.TypeC<NeedContext, StartContext> |
  PluginModule.TypeB<NeedContext, PluginContext, void> |
  PluginModule.TypeA<NeedContext>) {
  return plugin
}

// import { AsyncContext } from 'async-fp'

// May not need.
// Core framework module maybe able to use the same PluginModule type
// export type FrameworkModule = {
//   extendContext: AsyncContext.Transformer<any, any>,
//   start<StartContext extends Record<string | symbol, any>>(context: StartContext): Promise<void>
// }

export namespace PluginModule {
  export type activate<
    in NeedContext extends Record<string | symbol, any>,
    out AdditionalContext extends Record<string | symbol, any>,
    out StartContext extends Record<string | symbol, any>
    > = (context: NeedContext) => Promise<[AdditionalContext, StartContext?]>
  export type start<
    in StartContext extends Record<string | symbol, any>
    > = (context: StartContext) => Promise<void>
}

export function defineActivate<
  NeedContext extends Record<string | symbol, any>,
  AdditionalContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
>(activate: PluginModule.activate<NeedContext, AdditionalContext, StartContext>) {
  return activate
}

export function defineStart<
  StartContext extends Record<string | symbol, any>
>(start: PluginModule.start<StartContext>) {
  return start
}

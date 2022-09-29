// import { AsyncContext } from 'async-fp'

// May not need.
// Core framework module maybe able to use the same PluginModule type
// export type FrameworkModule = {
//   extendContext: AsyncContext.Transformer<any, any>,
//   start<StartContext extends Record<string | symbol, any>>(context: StartContext): Promise<void>
// }

export type PluginModule = {
  activate<
    NeedContext extends Record<string | symbol, any>,
    AdditionalContext extends Record<string | symbol, any>,
    StartContext extends Record<string | symbol, any>
  >(context: NeedContext): Promise<[AdditionalContext, StartContext]>,
  start<StartContext extends Record<string | symbol, any>>(context: StartContext): Promise<void>
}

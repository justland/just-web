import '@just-web/commands'
import '@just-web/contributions'
import * as platformModule from '@just-web/platform'
import '@just-web/states'
import { config, ConfigOptions } from 'standard-log'
import { Context, createContext } from './contexts/context'
import { log } from './log'
import { createPluginsContext, PluginsContext, startPlugins } from './plugins/context'

export * from './contexts/context'

export namespace createApp {
  export interface Options extends createContext.Options {
    log?: Partial<ConfigOptions>
  }
}

export interface AppContext extends Context, PluginsContext<AppContext> {
  start(): Promise<void>
}

export function createApp(options?: createApp.Options): AppContext {
  config(options?.log)
  const context = createContext(options)

  return {
    ...context,
    ...createPluginsContext({ context }),
    async start() {
      log.notice('application starts')
      await platformModule.start(context)
      await startPlugins()
    }
  }
}

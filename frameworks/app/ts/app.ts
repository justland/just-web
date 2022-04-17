import '@just-web/commands'
import '@just-web/contributions'
import * as platformModule from '@just-web/platform'
import '@just-web/states'
import { config, ConfigOptions, logLevels } from 'standard-log'
import { requiredDeep } from 'type-plus'
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

  return Object.assign(context, {
    ...createPluginsContext({ context }),
    async start() {
      log.notice('application starts')
      await startPlugins()
      await platformModule.start(context)
    }
  })
}

export function createTestApp(options?: createApp.Options): AppContext {
  config(requiredDeep({ mode: 'test', logLevel: logLevels.debug }, options?.log))
  const context = createContext(options)

  return Object.assign(context, {
    ...createPluginsContext({ context }),
    async start() {
      log.notice('application starts')
      await startPlugins()
      await platformModule.start(context)
    }
  })
}

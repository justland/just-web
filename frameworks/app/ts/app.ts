import '@just-web/commands'
import { Context, createContext } from '@just-web/contexts'
import '@just-web/contributions'
import * as platformModule from '@just-web/platform'
import * as pluginsModule from '@just-web/plugins'
import { PluginsContext } from '@just-web/plugins'
import '@just-web/states'
import { config, ConfigOptions } from 'standard-log'
import { log } from './log'

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
    ...pluginsModule.createPluginsContext({ context }),
    async start() {
      log.notice('application starts')
      await platformModule.start(context)
      await pluginsModule.start()
    }
  }
}

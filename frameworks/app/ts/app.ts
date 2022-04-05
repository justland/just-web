import '@just-web/commands'
import { createContext } from '@just-web/contexts'
import '@just-web/contributions'
import '@just-web/platform'
import { registerRoute } from '@just-web/routes'
import '@just-web/states'
import { config, ConfigOptions } from 'standard-log'
import { start } from './start'

export namespace createApp {
  export interface Options extends createContext.Options {
    log?: Partial<ConfigOptions>
  }
}

export function createApp(options?: createApp.Options) {
  config(options?.log)
  return {
    ...createContext(options),
    routes: { registerRoute },
    start
  }
}

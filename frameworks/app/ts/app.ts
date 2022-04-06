import '@just-web/commands'
import { create } from '@just-web/contexts'
import '@just-web/contributions'
import '@just-web/platform'
import { registerRoute } from '@just-web/routes'
import '@just-web/states'
import { config, ConfigOptions } from 'standard-log'
import { start } from './start'

export namespace createApp {
  export interface Options extends create.Options {
    log?: Partial<ConfigOptions>
  }
}

export function createApp(options?: createApp.Options) {
  config(options?.log)
  return {
    ...create(options),
    routes: { registerRoute },
    start
  }
}

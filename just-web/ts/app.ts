import '@just-web/commands'
import { create } from '@just-web/contexts'
import '@just-web/contributions'
import * as platformModule from '@just-web/platform'
import * as pluginsModule from '@just-web/plugins'
import { navigate, registerRoute, validateRoutes } from '@just-web/routes'
import '@just-web/states'
import { config, ConfigOptions } from 'standard-log'
import { required } from 'type-plus'
import { log } from './log'

export namespace createApp {
  export interface Options extends create.Options {
    log?: Partial<ConfigOptions>
  }
}

const defaultCtx = {
  routes: { navigate, registerRoute }
}
export namespace start {
  export type Ctx = typeof defaultCtx
  export interface Options {
  }
}

export function createApp(options?: createApp.Options) {
  config(options?.log)
  const context = create(options)

  return {
    ...context,
    ...pluginsModule.create({ context }),
    routes: { registerRoute },
    async start(options?: start.Options, ctx?: start.Ctx) {
      const { routes } = required(defaultCtx, ctx)

      log.notice('application starts')
      await pluginsModule.start()
      await platformModule.start(context)
      // TODO: validate app to make sure it has the minimum implementation,
      // such as handling `/` and `/error`
      if (!await validateRoutes()) return
      routes.navigate('/')
    }
  }
}

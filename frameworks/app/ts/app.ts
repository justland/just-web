import '@just-web/commands'
import '@just-web/contributions'
import { createLogContext, createTestLogContext, LogOptions, TestLogContext } from '@just-web/log'
import * as platformModule from '@just-web/platform'
import '@just-web/states'
import { Omit } from 'type-plus'
import { Context, createContext } from './contexts/context'
import { createPluginsClosure, PluginsContext, startPlugins } from './plugins/context'

export * from './contexts/context'
export type { PluginModule } from './plugins/context'

export namespace createApp {
  export interface Options extends createContext.Options {
    name: string,
    log?: LogOptions
  }
}

export interface AppContext extends Context, PluginsContext<AppContext> {
  start(): Promise<void>
}

export function createApp(options: createApp.Options): AppContext {
  const logContext = createLogContext(options, options.log)

  const context = createContext({ logContext }, options)
  const [pluginContext, { loading }] = createPluginsClosure({ context })
  return Object.assign(context, {
    ...pluginContext,
    async start() {
      const log = logContext.getLogger('@just-web/app')
      log.notice('application starts')
      await startPlugins({ logger: log, loading })
      await platformModule.start(context)
    }
  })
}

export interface TestAppContext extends Context, TestLogContext, PluginsContext<TestAppContext> {
  start(): Promise<void>
}

export namespace createTestApp {
  export interface Options extends createContext.Options {
    name?: string,
    log?: Omit<LogOptions, 'reporters'>
  }
}

export function createTestApp(options?: createTestApp.Options): TestAppContext {
  const logContext = createTestLogContext(options, options?.log)

  const log = logContext.getLogger('@just-web/app')
  const context = createContext({ logContext }, options)
  const [pluginContext, { loading }] = createPluginsClosure({ context })

  return Object.assign(context, {
    ...logContext,
    ...pluginContext,
    async start() {
      log.notice('application starts')
      await startPlugins({ logger: log, loading })
      await platformModule.start(context)
    }
  })
}

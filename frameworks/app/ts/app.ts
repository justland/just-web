import '@just-web/commands'
import '@just-web/contributions'
import { createLogContext, createTestLogContext, TestLogContext } from '@just-web/log'
import * as platformModule from '@just-web/platform'
import '@just-web/states'
import { ConfigOptions } from 'standard-log'
import { Omit } from 'type-plus'
import { Context, createContext } from './contexts/context'
import { log } from './log'
import { createPluginsContext, PluginsContext, startPlugins } from './plugins/context'

export * from './contexts/context'
export type { PluginModule } from './plugins/context'

export namespace createApp {
  export interface Options extends createContext.Options {
    log?: Partial<ConfigOptions>
  }
}

export interface AppContext extends Context, PluginsContext<AppContext> {
  start(): Promise<void>
}

export function createApp(options?: createApp.Options): AppContext {
  createLogContext(options?.log)
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

export interface TestAppContext extends Context, TestLogContext, PluginsContext<TestAppContext> {
  start(): Promise<void>
}

export namespace createTestApp {
  export interface Options extends createContext.Options {
    log?: Partial<Omit<ConfigOptions, 'reporters'>>
  }
}

export function createTestApp(options?: createTestApp.Options): TestAppContext {
  const logContext = createTestLogContext(options?.log)

  const context = createContext(options)

  return Object.assign(context, {
    ...logContext,
    ...createPluginsContext<TestAppContext>({ context }),
    async start() {
      log.notice('application starts')
      await startPlugins()
      await platformModule.start(context)
    }
  })
}

import '@just-web/commands'
import { CommandsContextOptions, createCommandsContext } from '@just-web/commands'
import '@just-web/contributions'
import { ContributionsContextOptions, createContributionsContext } from '@just-web/contributions'
import { createErrorsContext, ErrorsContextOptions } from '@just-web/errors'
import * as logModule from '@just-web/log'
import * as platformModule from '@just-web/platform'
import { Context, createContext, TestContext } from './contexts/context'
import { ctx } from './app.ctx'
import { createPluginsClosure, PluginsContext, startPlugins } from './plugins/context'

export type { Context, TestContext } from './contexts/context'
export type { PluginModule } from './plugins/context'

export interface AppContext extends Context, PluginsContext {
  start(): Promise<void>
}
export namespace createApp {
  export type Options = {
    name: string,
    contributions?: ContributionsContextOptions,
    commands?: CommandsContextOptions,
    errors?: ErrorsContextOptions,
  } & logModule.LogOptions
}

export function createApp(options: createApp.Options): AppContext {
  const logcontext = logModule.createLogContext({ name: options.name, options })
  const contributions = createContributionsContext(logcontext, options?.contributions)
  const commands = createCommandsContext({ contributions, ...logcontext }, options?.commands)

  const context = {
    appID: ctx.genAppID(),
    ...logcontext,
    commands,
    contributions,
    errors: createErrorsContext(options?.errors),
    platform: platformModule.createPlatformContext()
  }
  const [pluginContext, { loading }] = createPluginsClosure({ context })
  return Object.assign(context, {
    ...pluginContext,
    async start() {
      const logger = context.log.getLogger('@just-web/app')
      logger.notice('application starts')
      await startPlugins({ logger: logger, loading })
      await platformModule.start(context)
    }
  })
}

export interface TestAppContext extends TestContext, PluginsContext {
  start(): Promise<void>
}

export namespace createTestApp {
  export type Options = {
    name?: string,
    contributions?: ContributionsContextOptions,
    commands?: CommandsContextOptions,
    errors?: ErrorsContextOptions,
  } & logModule.TestLogOptions
}

export function createTestApp(options?: createTestApp.Options): TestAppContext {
  const logContext = logModule.createTestLogContext(options, options)

  const context = createContext(logContext, options)

  const [pluginContext, { loading }] = createPluginsClosure({ context })

  return Object.assign(context, {
    appID: ctx.genAppID(),
    ...logContext,
    ...pluginContext,
    async start() {
      const logger = logContext.log.getLogger('@just-web/app')
      logger.notice('application starts')
      await startPlugins({ logger: logger, loading })
      await platformModule.start(context)
    }
  })
}

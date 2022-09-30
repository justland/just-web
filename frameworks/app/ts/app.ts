import * as commandsModule from '@just-web/commands'
import * as contributionsModule from '@just-web/contributions'
import * as errorsModule from '@just-web/errors'
import * as logModule from '@just-web/log'
import * as platformModule from '@just-web/platform'
import { ctx } from './app.ctx'
import { Context, createContext, TestContext } from './contexts/context'
import { createPluginsClosure, PluginsContext, startPlugins } from './plugins/context'

export type { Context, TestContext } from './contexts/context'
export type { PluginModule } from './plugins/context'

export interface AppContext extends Context, PluginsContext {
  start(): Promise<void>
}
export namespace createApp {
  export type Options = {
    name: string,
    contributions?: contributionsModule.ContributionsContextOptions,
    errors?: errorsModule.ErrorsContextOptions,
  } & logModule.LogOptions & commandsModule.CommandsOptions
}

export function createApp(options: createApp.Options): AppContext {
  const logcontext = logModule.createLogContext({ name: options.name, options })
  const contributionsContext = contributionsModule.createContributionsContext(logcontext, options?.contributions)
  const commands = commandsModule.createCommandsContext({ options, ...contributionsContext, ...logcontext })
  const context = {
    appID: ctx.genAppID(),
    ...logcontext,
    commands,
    ...contributionsContext,
    errors: errorsModule.createErrorsContext(options?.errors),
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
    contributions?: contributionsModule.ContributionsContextOptions,
    errors?: errorsModule.ErrorsContextOptions,
  } & logModule.TestLogOptions & commandsModule.CommandsOptions
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

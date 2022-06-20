import '@just-web/commands'
import { CommandsContextOptions, createCommandsContext } from '@just-web/commands'
import '@just-web/contributions'
import { ContributionsContextOptions, createContributionsContext } from '@just-web/contributions'
import { createErrorsContext, ErrorsContextOptions } from '@just-web/errors'
import { createLogContext, createTestLogContext, LogOptions, TestLogOptions } from '@just-web/log'
import * as platformModule from '@just-web/platform'
import '@just-web/states'
import { Context, createContext, TestContext } from './contexts/context'
import { ctx } from './ctx'
import { createPluginsClosure, PluginsContext, startPlugins } from './plugins/context'

export type { Context, TestContext } from './contexts/context'
export type { PluginModule } from './plugins/context'

export interface AppContext extends Context, PluginsContext {
  start(): Promise<void>
}
export namespace createApp {
  export type Options = {
    name: string,
    log?: LogOptions,
    contributions?: ContributionsContextOptions,
    commands?: CommandsContextOptions,
    errors?: ErrorsContextOptions,
  }
}

export function createApp(options: createApp.Options): AppContext {
  const log = createLogContext(options, options.log)
  const contributions = createContributionsContext({ logContext: log }, options?.contributions)

  const commands = createCommandsContext({ contributions, logContext: log }, options?.commands)

  const context = {
    appID: ctx.genAppID(),
    log: log,
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
    log?: TestLogOptions,
    contributions?: ContributionsContextOptions,
    commands?: CommandsContextOptions,
    errors?: ErrorsContextOptions,
  }
}

export function createTestApp(options?: createTestApp.Options): TestAppContext {
  const log = createTestLogContext(options, options?.log)

  const context = createContext({ log }, options)

  const [pluginContext, { loading }] = createPluginsClosure({ context })

  return Object.assign(context, {
    appID: ctx.genAppID(),
    log,
    ...pluginContext,
    async start() {
      const logger = log.getLogger('@just-web/app')
      logger.notice('application starts')
      await startPlugins({ logger: logger, loading })
      await platformModule.start(context)
    }
  })
}

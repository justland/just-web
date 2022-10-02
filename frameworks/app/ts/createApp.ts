import * as browserModule from '@just-web/browser'
import browserContributions from '@just-web/browser-contributions'
import * as commandsModule from '@just-web/commands'
import * as contributionsModule from '@just-web/contributions'
import * as logModule from '@just-web/log'
import * as osModule from '@just-web/os'
import { ctx } from './createApp.ctx'
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
  } & logModule.LogOptions
    & commandsModule.CommandsOptions
    & contributionsModule.ContributionsOptions
    & browserModule.BrowserOptions
}

// export function createApp2(options: createApp.Options) {
//   const appContext = new AsyncContext({ name: options.name, appID: ctx.genAppID(), options })
//   const startContext = new AsyncContext()
//   return {
//     extend() { },
//     async load() { },
//     async start() { }
//   }
// }


export function createApp(options: createApp.Options): AppContext {
  const logcontext = logModule.createLogContext({ name: options.name, options })
  const contributionsContext = contributionsModule.createContributionsContext(logcontext, options)
  const commands = commandsModule.createCommandsContext({ options, ...contributionsContext, ...logcontext })
  const os = osModule.createOSContext()
  const context = {
    appID: ctx.genAppID(),
    ...logcontext,
    ...commands,
    ...contributionsContext,
    ...os,
    ...browserModule.createErrorsContext({ options })
  }
  const [pluginContext, { loading }] = createPluginsClosure({ context })
  return Object.assign(context, {
    ...pluginContext,
    async start() {
      const logger = context.log.getLogger('@just-web/app')
      logger.notice('application starts')
      await startPlugins({ logger: logger, loading })
      await browserContributions.start(context)
    }
  })
}

export interface TestAppContext extends TestContext, PluginsContext {
  start(): Promise<void>
}

export namespace createTestApp {
  export type Options = {
    name?: string,
  } & logModule.TestLogOptions
    & commandsModule.CommandsOptions
    & contributionsModule.ContributionsOptions
    & browserModule.BrowserOptions
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
      await browserContributions.start(context)
    }
  })
}

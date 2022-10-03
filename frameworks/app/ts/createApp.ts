import logPlugin, { createPrefixedGetLogger, LogContext, LogMethodNames, LogOptions, logPluginForTest, TestLogContext } from '@just-web/log'
import type { AppBaseContext, PluginModule } from '@just-web/types'
import { isType, pick } from 'type-plus'
import { ctx } from './createApp.ctx'

export namespace createApp {
  export type Options<N extends string = LogMethodNames> = { name: string, log?: LogOptions<N> }
}

// export namespace JustWebApp {
//   export type Methods = {
//     extend<
//       A extends Record<string | symbol, any>,
//       C extends Record<string | symbol, any>,
//       N extends Record<string | symbol, any>,
//       S extends Record<string | symbol, any>
//     >(this: A, plugin: PluginModule<C, N, S>): N extends object ? A & N : A,
//     start(): Promise<void>
//   }
// }

// export type JustWebApp<N extends string = LogMethodNames> = AppBaseContext & JustWebApp.Methods & LogContext<N>
// export type JustWebTestApp<N extends string = LogMethodNames> = AppBaseContext & JustWebApp.Methods & TestLogContext<N>

type AppNode = {
  name: string,
  started: boolean,
  parent?: AppNode,
  plugin?: () => Promise<void>,
  children: AppNode[],
  start(): Promise<void>
}

export function createApp<N extends string = LogMethodNames>(options: createApp.Options<N>) {
  const appContext = { name: options.name, id: ctx.genAppID() }
  const logModule = logPlugin(options.log)
  const [logctx] = logModule.init(appContext)
  const log = logctx.log as LogContext<LogMethodNames>['log']
  const appNode = createAppNode(options.name)
  return appClosure({ ...appContext, log }, appNode)
}

export type JustWebApp = ReturnType<typeof createApp>

function appClosure<L extends LogContext>(
  appContext: AppBaseContext & L,
  appNode: AppNode) {
  const log = appContext.log

  return {
    ...appContext,
    extend<
      C extends Record<string | symbol, any>,
      N extends Record<string | symbol, any>,
      S extends Record<string | symbol, any>>(this: C, plugin: PluginModule<C, N, S>): C & N {
      const childAppNode = createAppNode(plugin.name, appNode)

      const pluginLogger = Object.assign(log.getLogger(plugin.name), {
        ...pick(log, 'toLogLevel', 'toLogLevelName'),
        getLogger: createPrefixedGetLogger({ log }, plugin.name)
      })

      const initResult = plugin.init({ ...this, log: pluginLogger })
      if (!initResult) {
        if (isType<{ name: string, start(ctx: any): Promise<void> }>(plugin, p => !!p.start)) {
          childAppNode.plugin = () => plugin.start({ log: pluginLogger } as any)
        }
        return appClosure(appContext, childAppNode) as any
      }
      const [pluginContext, startContext] = initResult
      if (isType<{ name: string, start(ctx: any): Promise<void> }>(plugin, p => !!p.start))
        childAppNode.plugin = () => plugin.start({ ...startContext, log: pluginLogger } as any)
      return appClosure({ ...appContext, ...pluginContext! }, childAppNode) as any
    },
    async start() {
      let top: AppNode = appNode
      while (top.parent) top = top.parent
      if (top.started) return
      await top.start()
      log.info('start')
    }
  }
}

function createAppNode(name: string, parent?: AppNode): AppNode {
  const node: AppNode = {
    name,
    parent,
    started: false,
    children: [],
    async start() {
      if (this.started) return
      if (this.plugin) await this.plugin()
      for (const c of this.children) {
        await c.start()
      }
      this.started = true
    }
  }
  parent?.children.push(node)
  return node
}
export namespace createTestApp {
  export type Options<N extends string = LogMethodNames> = { name?: string, log?: LogOptions<N> }
}


export function createTestApp<N extends string = LogMethodNames>(options?: createTestApp.Options<N>) {
  const name = options?.name ?? 'test-app'
  const appContext = { name: name, id: ctx.genAppID() }
  const logModule = logPluginForTest(options?.log)
  const [logctx] = logModule.init(appContext)
  const log = logctx.log as TestLogContext<LogMethodNames>['log']
  const appNode = createAppNode(name)
  return appClosure({ ...appContext, log }, appNode)
}

export type JustWebTestApp = ReturnType<typeof createTestApp>

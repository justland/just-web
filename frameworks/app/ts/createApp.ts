/* eslint-disable @typescript-eslint/no-unused-vars */
import logPlugin, { createPrefixedGetLogger, createPrefixedGetNonConsoleLogger, LogContext, LogMethodNames, LogOptions, logTestPlugin, TestLogContext } from '@just-web/log'
import type { AppBaseContext, PluginModule } from '@just-web/types'
import { isType, LeftJoin, pick } from 'type-plus'
import { ctx } from './createApp.ctx'

export namespace createApp {
  export type Options<N extends string = LogMethodNames> = { name: string } & LogOptions<N>
}

type AppNode = {
  name: string,
  started: boolean,
  parent?: AppNode,
  plugin?: () => Promise<void>,
  children: AppNode[],
  start(): Promise<void>
}

/**
 * Creates a new `@just-web` application.
 * @type N Inferred type for log methods. You don't need to specify this explicitly.
 * Add the custom logs under `options.log.customLevels`
 */
export function createApp<N extends string = LogMethodNames>(options: createApp.Options<N>) {
  const appContext = { name: options.name, id: ctx.genAppID() }
  const logModule = logPlugin(options)
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

  function extend<
    C extends Record<string | symbol, any>,
    P
  >(this: C, plugin: P)
    : P extends PluginModule.TypeD<infer N, infer PM, infer S>
    ? LeftJoin<C, PM>
    : (P extends PluginModule.TypeB<infer N, infer PM>
      ? LeftJoin<C, PM>
      : (P extends PluginModule.TypeB_WithStart<infer N, infer PM>
        ? LeftJoin<C, PM>
        : C))
  function extend(this: any, plugin: any) {
    const childAppNode = createAppNode(plugin.id, appNode)

    const pluginLogger = Object.assign(log.getLogger(plugin.id), {
      ...pick(log, 'toLogLevel', 'toLogLevelName'),
      getLogger: createPrefixedGetLogger({ log }, plugin.id),
      getNonConsoleLogger: createPrefixedGetNonConsoleLogger({ log }, plugin.id)
    })

    log.notice(`initializing ${plugin.id}`)
    const initResult = plugin.init({ ...this, log: pluginLogger })
    if (!initResult) {
      if (isType<{ id: string, start(ctx: any): Promise<void> }>(plugin, p => !!p.start)) {
        childAppNode.plugin = () => {
          log.notice(`starting ${plugin.id}`)
          return plugin.start({ log: pluginLogger } as any)
        }
      }
      return appClosure(appContext, childAppNode) as any
    }
    const [pluginContext, startContext] = initResult
    if (isType<{
      id: string, start(ctx: any): Promise<void>
    }>(plugin, p => !!p.start)) {
      childAppNode.plugin = () => {
        log.notice(`starting ${plugin.id}`)
        return plugin.start({ ...startContext, log: pluginLogger } as any)
      }
    }
    return appClosure({ ...appContext, ...pluginContext! }, childAppNode) as any
  }

  return {
    ...appContext,
    extend,
    async start() {
      let top: AppNode = appNode
      while (top.parent) top = top.parent
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
      if (!this.started && this.plugin) await this.plugin()
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
  export type Options<N extends string = LogMethodNames> = { name?: string } & LogOptions<N>
}


export function createTestApp<N extends string = LogMethodNames>(options?: createTestApp.Options<N>) {
  const name = options?.name ?? 'test-app'
  const appContext = { name: name, id: ctx.genAppID() }
  const logModule = logTestPlugin(options)
  const [logctx] = logModule.init(appContext)
  const log = logctx.log as TestLogContext<LogMethodNames>['log']
  const appNode = createAppNode(name)
  return appClosure({ ...appContext, log }, appNode)
}

export type JustWebTestApp = ReturnType<typeof createTestApp>

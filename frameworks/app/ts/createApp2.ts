import logPlugin, { LogMethodNames, LogOptions } from '@just-web/log'
import { ctx } from './createApp.ctx'

export namespace createApp2 {
  export type Options<N extends string = LogMethodNames> = { name: string } & LogOptions<N>
}

export function createApp2<N extends string = LogMethodNames>(options: createApp2.Options<N>) {
  const appContext = { ...options, id: ctx.genAppID() }

  const [{ log }] = logPlugin.init<N>(appContext)
  return {
    name: appContext.name,
    id: appContext.id,
    log
  }
}

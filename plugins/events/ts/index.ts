import { LogContext, Logger } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import { EventEmitterLike, trapError } from '@unional/events-plus'
import { EventEmitter } from 'eventemitter3'

export { justEvent, JustEventDuo, JustEventEmpty, JustEventUno } from '@unional/events-plus'

export interface EventsContext {
  logger: Logger
}

export type EventsContextOptions = {
  options?: {
    emitter?: EventEmitterLike
  }
} & LogContext

export default definePlugin(() => ({
  name: '@just-web/events',
  init: (ctx: EventsContextOptions) => {
    ctx.log.notice('init')
    const emitter = trapError(ctx.options?.emitter || new EventEmitter(), ctx.log)

    return [{ emitter }]
  }
}))

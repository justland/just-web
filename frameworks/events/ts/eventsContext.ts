import { LogContext, Logger } from '@just-web/log'
import { defineInitialize } from '@just-web/types'
import { EventEmitterLike, trapError } from '@unional/events-plus'
import { EventEmitter } from 'eventemitter3'

export interface EventsContext {
  logger: Logger
}

export type EventsContextOptions = {
  options?: {
    emitter?: EventEmitterLike
  }
} & LogContext

export const initialize = defineInitialize(async (ctx: EventsContextOptions) => {
  const log = ctx.log.getLogger('@just-web/events')
  const emitter = trapError(ctx.options?.emitter || new EventEmitter(), log)

  return [{ emitter }]
})

export function createEventsContext(ctx: EventsContextOptions) {
  const log = ctx.log.getLogger('@just-web/events')
  const emitter = trapError(ctx.options?.emitter || new EventEmitter(), log)

  return { emitter }
}

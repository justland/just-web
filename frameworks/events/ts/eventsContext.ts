import { LogContext, Logger } from '@just-web/log'
import { defineActivate } from '@just-web/types'
import { EventEmitterLike, trapError } from '@unional/events-plus'
import { EventEmitter } from 'eventemitter3'

export interface EventsContext {
  logger: Logger
}

export type EventsContextOptions = {
  emitter?: EventEmitterLike
} & LogContext

export const activate = defineActivate(async (ctx: EventsContextOptions) => {
  const log = ctx.log.getLogger('@just-web/events')
  const emitter = trapError(ctx?.emitter || new EventEmitter(), log)

  return [{ emitter }]
})

export function createEventsContext(options: EventsContextOptions) {
  const log = options.log.getLogger('@just-web/events')
  const emitter = trapError(options?.emitter || new EventEmitter(), log)

  return { emitter }
}

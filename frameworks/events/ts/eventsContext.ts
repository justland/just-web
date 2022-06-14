import { LogContext, Logger } from '@just-web/log'
import { EventEmitterLike, trapError } from '@unional/events-plus'
import { EventEmitter } from 'eventemitter3'

export interface EventsContext {
  logger: Logger
}

export interface EventsContextOptions {
  logContext: LogContext,
  emitter?: EventEmitterLike
}

export function createEventsContext(options: EventsContextOptions) {
  const log = options.logContext.getLogger('@just-web/events')
  const emitter = trapError(options?.emitter || new EventEmitter(), log)

  return { emitter }
}

import { EventEmitterLike, trapError } from '@unional/events-plus'
import { EventEmitter } from 'eventemitter3'
import { log } from './log'


export interface EventsContextOptions {
  emitter?: EventEmitterLike
}

export function createEventsContext(options?: EventsContextOptions) {
  const emitter = trapError(options?.emitter || new EventEmitter(), log)

  return { emitter }
}

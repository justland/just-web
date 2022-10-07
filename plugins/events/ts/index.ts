import { LogContext } from '@just-web/log'
import { EventEmitterLike, trapError } from '@unional/events-plus'
import { EventEmitter } from 'eventemitter3'

export { justEvent, JustEventDuo, JustEventEmpty, JustEventUno } from '@unional/events-plus'

export type EventsOptions<E extends EventEmitterLike> = {
  emitter?: E
}

export type EventsContext<E extends EventEmitterLike> = {
  emitter: E
}

// unfortunately since `eventemitter3` is not exposing the `EventEmitter` class declaration,
// I have to do this to get the inferred type.
const e = new EventEmitter()

const plugin = <E extends EventEmitterLike = typeof e>(options?: EventsOptions<E>) => ({
  name: '@just-web/events',
  init: (ctx: LogContext): [EventsContext<E>] => [
    {
      emitter: options?.emitter
        ? trapError(options?.emitter, ctx.log)
        : trapError(new EventEmitter(), ctx.log)
    }
  ] as any
})

export default plugin

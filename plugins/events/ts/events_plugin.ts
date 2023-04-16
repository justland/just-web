import type { LogContext } from '@just-web/log'
import { EventEmitterLike, trapError } from '@unional/events-plus'
import { EventEmitter } from 'eventemitter3'

export type EventsOptions<E extends EventEmitterLike> = {
	events?: {
		emitter?: E
	}
}

export type EventsContext<E extends EventEmitterLike> = {
	events: {
		emitter: E
	}
}

export const eventsPlugin = <E extends EventEmitterLike = EventEmitter>(options?: EventsOptions<E>) => ({
	name: '@just-web/events',
	init: (ctx: LogContext): [EventsContext<E>] =>
		[
			{
				events: {
					emitter: trapError(options?.events?.emitter ?? new EventEmitter(), ctx.log)
				}
			}
		] as any
})

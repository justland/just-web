import { define, type LogGizmo } from '@just-web/app'
import { type EventEmitterLike, trapError } from '@unional/events-plus'
import { EventEmitter } from 'eventemitter3'

export type EventsGizmoOptions<E extends EventEmitterLike> = {
	emitter?: E
}

export const eventsGizmoFn = define(<E extends EventEmitterLike = EventEmitter>(options?: EventsGizmoOptions<E>) => ({
	static: define.require<LogGizmo>(),
	async create(ctx: LogGizmo) {
		return {
			events: {
				emitter: trapError((options?.emitter ?? new EventEmitter()) as E, ctx.log)
			}
		}
	}
}))

export type EventsGizmo<E extends EventEmitterLike = EventEmitter> = define.Infer<typeof eventsGizmoFn<E>>

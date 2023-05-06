import { idGizmoFn, type IdGizmo } from '@just-web/id'
import { logGizmoFn } from '@just-web/log'
import { incubate, type GizmoIncubator } from '@unional/gizmo'
import type { JustAppOptions } from './just_app.types.js'

export function incubateApp(options: JustAppOptions): GizmoIncubator<IdGizmo> {
	const incubator = incubate().with(idGizmoFn(options))
	return new Proxy(incubator, {
		get(target, prop) {
			if (prop === 'create') {
				return async function create(start: (app: any) => Promise<void>) {
					const app = await target.create(start)

					const log =
						typeof (app as any).log?.info === 'function'
							? (app as any).log
							: (await incubate().with(idGizmoFn(options)).with(logGizmoFn(options.log)).create()).log
					log.info(`created (id: ${app.id})`)
					return app
				}
			} else {
				return (target as any)[prop]
			}
		}
	})
}

import { Gizmo, GizmoIncubator, IdGizmo, idGizmoFn, incubate, logGizmoFn } from '@just-web/framework'
import { AppBuilderOptions } from './just_app.types.js'

export function incubateApp(options: AppBuilderOptions): GizmoIncubator<IdGizmo> {
	let incubator = incubate(idGizmoFn(options))
	return {
		with<G extends Gizmo>(gizmo: G) {
			incubator = incubator.with(gizmo)
			return this as any
		},
		async create() {
			const app = await incubator.create()

			const log =
				typeof (app as any).log?.info === 'function'
					? (app as any).log
					: (await incubate(idGizmoFn(options)).with(logGizmoFn(options.log)).create()).log
			log.info(`created (id: ${app.id})`)
			return app
		}
	}
}

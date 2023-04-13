import {
	AppGizmo,
	Gizmo,
	GizmoIncubator,
	appGizmo,
	incubate,
	logGizmo
} from '@just-web/framework'
import { AppBuilderOptions } from './just_app.types.js'

export function incubateApp(options: AppBuilderOptions): GizmoIncubator<AppGizmo> {
	const appLogger = incubate(appGizmo(options)).with(logGizmo(options))
	let incubator = incubate(appGizmo(options))
	return {
		with<G extends Gizmo>(gizmo: G) {
			incubator = incubator.with(gizmo)
			return this as any
		},
		async create() {
			const { log } = await appLogger.create()
			const app = await incubator.create()
			log.info(`created (id: ${app.id})`)
			return app
		}
	}
}

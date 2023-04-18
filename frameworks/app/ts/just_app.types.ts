import type { IdGizmo, IdGizmoOptions } from '@just-web/id'
import type { LogGizmo, LogGizmoOptions } from '@just-web/log'

export type JustAppOptions = IdGizmoOptions & { log?: LogGizmoOptions }

export type JustApp = IdGizmo & LogGizmo

import type { IdGizmoOptions } from '@just-web/id'
import type { LogGizmoOptions } from '@just-web/log'

export type JustAppOptions = IdGizmoOptions & { log?: LogGizmoOptions }

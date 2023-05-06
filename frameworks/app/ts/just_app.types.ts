import type { IdGizmo, IdGizmoOptions } from '@just-web/id'
import type { LogGizmo, LogGizmoOptions } from '@just-web/log'

export type JustAppOptions = IdGizmoOptions & { log?: LogGizmoOptions | undefined }

/**
 * This is the basic type of an `JustApp`.
 *
 * Normally you don't need to use this type.
 *
 * You can use `justApp.Infer<typeof yourApp>` to infer the actual type of your app.
 */
export type JustApp = IdGizmo & LogGizmo

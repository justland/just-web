import { define, type GizmoBase } from '@just-web/app'
import { unpartial } from 'type-plus'
import { isMac } from './os.js'
import type { OSGizmo } from './os_gizmo.js'

export interface OSTestGizmoOptions {
	isMac?: () => boolean
}

/**
 * Gizmo function to create a test OSGizmo.
 *
 * It allows you to define the `os` object.
 */
export const osTestGizmoFn: (options: OSTestGizmoOptions) => GizmoBase<OSGizmo> = define(
	(options: OSTestGizmoOptions) => ({
		async create() {
			return { os: unpartial({ isMac }, options) }
		}
	})
)

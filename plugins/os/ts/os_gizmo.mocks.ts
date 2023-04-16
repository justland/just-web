import { define } from '@just-web/app'
import { unpartial } from 'type-plus'
import { isMac } from './os.js'
import type { OSGizmo } from './os_gizmo.js'

export type OSTestGizmoOptions = Partial<OSGizmo>

export const osTestGizmo = define((options?: OSTestGizmoOptions) => ({
	async create() {
		return { os: unpartial({ isMac }, options?.os) }
	}
}))

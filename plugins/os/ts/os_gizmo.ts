import { define } from '@just-web/framework'
import { isMac } from './os.js'

export const osGizmo = define({
	async create() {
		return { os: { isMac } }
	}
})

export type OSGizmo = define.Infer<typeof osGizmo>

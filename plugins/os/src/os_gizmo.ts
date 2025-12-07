import { define } from '@just-web/app'
import { isMac } from './os.js'

export const osGizmo = define({
	async create() {
		return {
			os: {
				/**
				 * Checks if the current operating system is macOS.
				 *
				 * @return {boolean} Returns true if the operating system is macOS, otherwise false.
				 */
				isMac
			}
		}
	}
})

export type OSGizmo = define.Infer<typeof osGizmo>

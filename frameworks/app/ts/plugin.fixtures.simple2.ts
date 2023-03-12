import { definePlugin } from './plugin.js'

export const simple2Plugin = definePlugin((defaultValue: number) => ({
	name: 'simple2',
	async define() {
		return {
			simple2: {
				foo() {
					return defaultValue
				}
			}
		}
	}
}))


export type Simple2Plugin = typeof simple2Plugin

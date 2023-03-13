import { ctx } from './createApp.ctx.js'

export function appBuilder({ name }: { name: string }) {
	return {
		async build() {
			return {
				name,
				id: ctx.genAppID()
			}
		}
	}
}

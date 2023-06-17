import platform from 'platform'

export namespace ctx {
	export interface OperatingSystem {
		family?: string | undefined
	}
}

export const ctx: { os?: ctx.OperatingSystem | undefined } = platform

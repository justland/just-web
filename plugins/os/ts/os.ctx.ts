import platform from 'platform'

export namespace ctx {
	export type OperatingSystem = {
		family?: string | undefined
	}
}

export const ctx: { os?: ctx.OperatingSystem | undefined } = platform

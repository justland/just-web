import { define, type IdGizmo, incubate, type LogGizmo } from '@just-web/app'
import type { BrowserGizmo } from '@just-web/browser'
import type { CommandsGizmo } from '@just-web/commands'
import type { KeyboardGizmo } from '@just-web/keyboard'
import { clearAllUserPreferences, getUserPreference, preferencesGizmo, setUserPreference } from '@just-web/preferences'
import { isNothing } from '@just-web/states'
import { produce } from 'immer'
import { decode, encode } from 'js-base64'
import { MaybePromise } from 'type-plus'

/**
 * Preferences Gizmo implementation for the browser.
 */
export const browserPreferencesGizmo = define({
	static: define
		.require<IdGizmo>()
		.require<LogGizmo>()
		.require<CommandsGizmo>()
		.require<BrowserGizmo>()
		.optional<KeyboardGizmo>(),
	async create(ctx) {
		const localStorage = ctx.browser.localStorage
		function getItem(k: string) {
			return deserialize(ctx.browser.localStorage.getItem(k))
		}

		getUserPreference.connect(ctx, (key, defaultValue) => {
			const k = getKey(ctx.name, key)
			ctx.log.planck(`get: '${k}'`)
			return getItem(k) ?? defaultValue
		})
		setUserPreference.connect(ctx, async (key, value) => {
			const k = getKey(ctx.name, key)
			const original = getItem(k)
			const v = typeof value === 'function' ? produce(original, value as any) : value
			MaybePromise.transform(v, v => {
				if (isNothing(v) || v === undefined) {
					ctx.log.trace(`set: clear '${k}'`)
					localStorage.removeItem(k)
				} else {
					ctx.log.trace(`set: '${k}' ${original} -> ${v}`)
					localStorage.setItem(k, serialize(v))
				}
			})
		})
		clearAllUserPreferences.connect(ctx, () => {
			ctx.log.notice(`clear all: '${ctx.name}'`)
			const keys: string[] = []
			// have to iterate and get all keys first.
			// removing item mid-loop screw up key index.
			for (let i = 0; i < localStorage.length; i++) {
				keys.push(localStorage.key(i)!)
			}
			keys
				.filter(k => k.startsWith(`${ctx.name}:`))
				.forEach(k => {
					ctx.log.trace(`clear all: clear '${k}'`)
					localStorage.removeItem(k)
				})
		})

		const { preferences } = await incubate(ctx).with(preferencesGizmo).create()
		return { preferences }
	}
})

function getKey(id: string, key: string) {
	return `${id}:${key}`
}

function serialize(value: string) {
	return encode(value)
}

function deserialize(value: string | null) {
	return value === null ? undefined : decode(value)
}

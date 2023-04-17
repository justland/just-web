import { define, type IdGizmo, type LogGizmo } from '@just-web/app'
import type { CommandsGizmo } from '@just-web/commands'
import type { KeyboardGizmo } from '@just-web/keyboard'
import { clearAllUserPreferences, getUserPreference, setUserPreference } from '@just-web/preferences'
import { produce } from 'immer'
import { MaybePromise } from 'type-plus'
import { ctx } from './local_storage_store.ctx.js'
import { getItem, getKey, setHandler } from './local_storage_store.js'

export const browserPreferencesGizmo = define({
	static: define.require<IdGizmo>().require<LogGizmo>().require<CommandsGizmo>().optional<KeyboardGizmo>(),
	async create({ name, commands, keyboard, log }) {
		getUserPreference.connect({ commands, keyboard }, (key, defaultValue) => {
			const k = getKey(name, key)
			log.planck(`get: '${k}'`)
			return getItem(k) ?? defaultValue
		})
		setUserPreference.connect({ commands, keyboard }, async (key, value) => {
			const k = getKey(name, key)
			const original = getItem(k)
			const v = typeof value === 'function' ? produce(original, value as any) : value
			MaybePromise.transform(v, v => setHandler({ log }, k, original, v))
		})
		clearAllUserPreferences.connect({ commands, keyboard }, () => {
			log.notice(`clear all: '${name}'`)
			const keys: string[] = []
			const localStorage = ctx.getLocalStorage()
			// have to iterate and get all keys first.
			// removing item mid-loop screw up key index.
			for (let i = 0; i < localStorage.length; i++) {
				keys.push(localStorage.key(i)!)
			}
			keys
				.filter(k => k.startsWith(`${name}:`))
				.forEach(k => {
					log.trace(`clear all: clear '${k}'`)
					localStorage.removeItem(k)
				})
		})
	}
})

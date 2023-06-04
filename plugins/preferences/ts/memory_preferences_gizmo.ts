import { define, incubate } from '@just-web/app'
import type { CommandsGizmo } from '@just-web/commands'
import type { KeyboardGizmo } from '@just-web/keyboard'
import { isNothing } from '@just-web/states'
import { produce } from 'immer'
import { MaybePromise, record } from 'type-plus'
import { clearAllUserPreferences, getUserPreference, setUserPreference } from './preferences.js'
import { preferencesGizmo } from './preferences_gizmo.js'

/**
 * In Memory Preferences Gizmo.
 *
 * The preferences are stored in memory and will be lost when the app is closed.
 * It uses a empty [record](https://github.com/unional/type-plus/blob/main/ts/object/record.ts) as the storage.
 * It does not use `Map` because we don't need any advanced features of `Map`.
 *
 * It can be used during testing.
 *
 * @example
 * ```ts
 * const app = await justApp()
 * 	.with(keyboardGizmo) // optional
 * 	.with(commandsGizmo)
 * 	.with(memoryPreferencesGizmo).create()
 *
 * app.preferences.set('foo', 'bar')
 * app.preferences.get('foo') // 'bar'
 * ```
 */
export const memoryPreferencesGizmo = define({
	static: define.require<CommandsGizmo>().optional<KeyboardGizmo>(),
	async create(ctx) {
		let storage = record<string, any>()
		getUserPreference.connect(ctx, (key, defaultValue) => storage[key] ?? defaultValue)
		setUserPreference.connect(ctx, (key, value) => {
			const v = typeof value === 'function' ? produce(storage[key], value as any) : value
			return MaybePromise.transform(v, v => {
				if (isNothing(v)) delete storage[key]
				else storage[key] = v
			})
		})
		clearAllUserPreferences.connect(ctx, () => {
			storage = record<string, any>()
		})
		const { preferences } = await incubate(ctx).with(preferencesGizmo).create()
		return { preferences }
	}
})

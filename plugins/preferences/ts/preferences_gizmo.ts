import { define } from '@just-web/app'
import type { CommandsGizmo } from '@just-web/commands'
import type { KeyboardGizmo } from '@just-web/keyboard'
import { isNothing, type SetStateValue, type Updater } from '@just-web/states'
import { MaybePromise, extractFunction, isType, type AnyFunction, type JSONTypes } from 'type-plus'
import { clearAllUserPreferences, getUserPreference, setUserPreference } from './preferences.js'

export type { SetStateValue }

/**
 * Preferences Gizmo.
 * This gizmo provides the commands to get/set user preferences.
 * The actual implementations are provided elsewhere.
 * As there can be multiple ways to do it.
 *
 * For example, this package provides a in-memory implementation.
 *
 * Other obvious choices are to use localStorage or IndexedDB.
 * And you may need to scope the preferences by user and/or by app.
 *
 * @require CommandsGizmo
 * @optional KeyboardGizmo
 */
export const preferencesGizmo = define({
	static: define.require<CommandsGizmo>().optional<KeyboardGizmo>(),
	async create() {
		return {
			preferences: {
				get: extractFunction(getUserPreference),
				set: extractFunction(setUserPreference),
				clearAll: extractFunction(clearAllUserPreferences),
				/**
				 * Creates a [store](https://github.com/justland/just-web/tree/main/libraries/states#createstore) for a specific key.
				 *
				 * ```ts
				 * const app = await justApp()...with(preferencesGizmo).create()
				 * const store = app.preferences.createStore('foo')
				 * store.get() // undefined
				 * store.set('bar')
				 * store.get() // 'bar'
				 * ```
				 */
				createStore<T extends JSONTypes>(key: string, defaultValue?: T) {
					// eslint-disable-next-line @typescript-eslint/no-this-alias
					const self = this
					function set<V extends SetStateValue<T | undefined> | undefined>(
						value: V
					): V extends AnyFunction<any, Promise<any>> ? Promise<void> : void
					function set(value: SetStateValue<T | undefined> | undefined) {
						if (isType<Updater<T>>(value, value => typeof value === 'function')) {
							return self.set(key, v => {
								const orig: T = v !== undefined ? JSON.parse(v) : defaultValue
								return MaybePromise.transform(value(orig as any), v => {
									if (isNothing(v)) return v
									if (v !== undefined) return JSON.stringify(v)
								})
							})
						} else {
							const v = value !== undefined ? JSON.stringify(value) : value
							self.set(key, v)
						}
					}

					return {
						get(): T {
							const s = self.get(key)
							return s !== undefined ? JSON.parse(s) : defaultValue
						},
						set
					}
				}
			}
		}
	}
})

export type PreferencesGizmo = define.Infer<typeof preferencesGizmo>

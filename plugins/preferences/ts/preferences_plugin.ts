import { CommandsContext } from '@just-web/commands'
import type { KeyboardContext } from '@just-web/keyboard'
import { isNothing, SetStateValue, Updater } from '@just-web/states'
import { definePlugin, PluginContext } from '@just-web/types'
import { AnyFunction, extractFunction, isType, JSONTypes, MaybePromise } from 'type-plus'
import { clearAllUserPreferences, getUserPreference, setUserPreference } from './preferences.js'

/**
 * Preferences Plugin.
 * @uses `@just-web/commands`
 * @optional `@just-web/keyboard`
 */
export const preferencesPlugin = definePlugin(() => ({
	name: '@just-web/preferences',
	init: (ctx: CommandsContext & Partial<KeyboardContext>) => {
		getUserPreference.connect(ctx)
		setUserPreference.connect(ctx)
		clearAllUserPreferences.connect(ctx)

		return [
			{
				preferences: {
					get: extractFunction(getUserPreference),
					set: extractFunction(setUserPreference),
					clearAll: extractFunction(clearAllUserPreferences),
					createStore
				}
			}
		]
	}
}))

export type PreferencesContext = PluginContext<typeof preferencesPlugin>

function createStore<T extends JSONTypes>(
	this: PreferencesContext['preferences'],
	key: string,
	defaultValue?: T
) {
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

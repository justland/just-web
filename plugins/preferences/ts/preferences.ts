import { command, CommandsContext } from '@just-web/commands'
import type { KeyboardContext } from '@just-web/keyboard'
import { isNothing, SetStateValue, Updater } from '@just-web/states'
import { definePlugin, PluginContext } from '@just-web/types'
import { AnyFunction, extractFunction, isType, JSONTypes, MaybePromise } from 'type-plus'

/**
 * Gets a specific user preference
 *
 * @param key key of the preference. It should be unique across plugins.
 * This key will be combined with tha app name to form a unique key across host.
 * So that will work in MFE.
 * @param defaultValue Optional. The default value to return if the preference doesn't exist.
 */
export const getUserPreference = command<(key: string, defaultValue?: string) => string | undefined>('just-web.getUserPreference')
/**
 * Set the specified user preference.
 * @param key The key of the preference to be updated.
 * @param value new value or value update handler.
 * If the value or the result of the handler is undefined,
 * the preference should be removed.
 */
export const setUserPreference = command<(key: string, value: SetStateValue<string | undefined>) => void>('just-web.setUserPreference')
export const clearAllUserPreferences = command({ id: 'just-web.clearAllUserPreferences' })

/**
 * Preferences Plugin.
 * @uses `@just-web/commands`
 * @optional `@just-web/keyboard`
 */
const plugin = definePlugin(() => ({
  name: '@just-web/preferences',
  init: (ctx: CommandsContext & Partial<KeyboardContext>) => {
    getUserPreference.connect(ctx)
    setUserPreference.connect(ctx)
    clearAllUserPreferences.connect(ctx)

    return [{
      preferences: {
        get: extractFunction(getUserPreference),
        set: extractFunction(setUserPreference),
        clearAll: extractFunction(clearAllUserPreferences),
        createStore
      }
    }]
  }
}))

export default plugin

export type PreferencesContext = PluginContext<typeof plugin>

function createStore<T extends JSONTypes>(
  this: PreferencesContext['preferences'],
  key: string,
  defaultValue?: T) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this

  function set<
    V extends SetStateValue<T | undefined> | undefined
  >(value: V): V extends AnyFunction<any, Promise<any>> ? Promise<void> : void
  function set(value: SetStateValue<T | undefined> | undefined) {
    if (isType<Updater<T>>(value, value => typeof value === 'function')) {
      return self.set(key, v => {
        const orig: T = v !== undefined ? JSON.parse(v) : defaultValue
        return MaybePromise.transform(
          value(orig as any),
          v => {
            if (isNothing(v)) return v
            if (v !== undefined) return JSON.stringify(v)
          })
      })
    }
    else {
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

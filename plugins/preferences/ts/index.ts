import { command, CommandsContext } from '@just-web/commands'
import { KeyboardContext } from '@just-web/keyboard'
import { definePlugin } from '@just-web/types'

/**
 * Gets a specific user preference
 *
 * @param key key of the preference. It should be unique across plugins.
 * This key will be combined with tha app name to form a unique key across host.
 * So that will work in MFE.
 * @param defaultValue Optional. The default value to return if the preference doesn't exist.
 */
export const getUserPreference = command<[key: string, defaultValue?: string], string | undefined>('just-web.getUserPreference')
/**
 * Set the specified user preference.
 * @param key The key of the preference to be updated.
 * @param value new value or value update handler.
 * If the value or the result of the handler is undefined,
 * the preference should be removed.
 */
export const setUserPreference = command<[key: string, value: string | undefined | ((prevValue: string | undefined) => string | undefined)]>('just-web.setUserPreference')
export const clearAllUserPreferences = command({ id: 'just-web.clearAllUserPreferences' })

const plugin = definePlugin(() => ({
  name: '@just-web/preferences',
  init: (ctx: CommandsContext & Partial<KeyboardContext>) => {
    getUserPreference.connect(ctx)
    setUserPreference.connect(ctx)
    clearAllUserPreferences.connect(ctx)

    return [{
      preferences: {
        get: getUserPreference,
        set: setUserPreference,
        clearAll: clearAllUserPreferences
      }
    }]
  }
}))

export default plugin

export type PreferencesContext = ReturnType<ReturnType<typeof plugin>['init']>[0]

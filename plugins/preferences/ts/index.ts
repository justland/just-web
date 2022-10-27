import { command, CommandsContext } from '@just-web/commands'
import { KeyboardContext } from '@just-web/keyboard'
import { definePlugin } from '@just-web/types'

/**
 * Set the specified user preference.
 * @param key The key of the preference to be update
 */
export const setUserPreference = command<[key: string, value: string]>('just-web.setUserPreference')
export const getUserPreference = command<[key: string, defaultValue?: string], string | undefined>('just-web.getUserPreference')
export const updateUserPreference = command<
  [key: string, handler: (value: string | undefined) => string]
>('just-web.updateUserPreference')

/**
 * Clear the specified user preference.
 * @param key The key of the preference to be cleared
 */
export const clearUserPreference = command<[key: string]>('just-web.clearUserPreference')
export const clearUserPreferences = command({ id: 'just-web.clearUserPreferences' })

const plugin = definePlugin(() => ({
  name: '@just-web/preferences',
  init: (ctx: CommandsContext & Partial<KeyboardContext>) => {
    getUserPreference.connect(ctx)
    setUserPreference.connect(ctx)
    updateUserPreference.connect(ctx)
    clearUserPreference.connect(ctx)
    clearUserPreferences.connect(ctx)

    return [{
      preferences: {
        get: getUserPreference,
        set: setUserPreference,
        update: updateUserPreference,
        clear: clearUserPreference,
        clearAll: clearUserPreferences
      }
    }]
  }
}))

export default plugin

export type PreferencesContext = ReturnType<ReturnType<typeof plugin>['init']>[0]

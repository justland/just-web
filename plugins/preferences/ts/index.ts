import { CommandsContext } from '@just-web/commands'
import { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import { justEvent } from '@unional/events-plus'

/**
 * Set the specified user preference.
 * @param key The key of the preference to be update
 */
export const setUserPreference = justEvent<{ key: string, value: string }>('just-web.setUserPreference')
export const getUserPreference = justEvent<{ key: string }>('just-web.getUserPreference')
export const updateUserPreference = justEvent<{ key: string, handler: (value: string | undefined) => string }>('just-web.updateUserPreference')

/**
 * Clear the specified user preference.
 * @param key The key of the preference to be cleared
 */
export const clearUserPreference = justEvent<{ key: string }>('just-web.clearUserPreference')
export const clearUserPreferences = justEvent('just-web.clearUserPreferences')

const plugin = definePlugin(() => ({
  name: '@just-web/preferences',
  init: ({ commands }: LogContext & CommandsContext) => {
    commands.contributions.add({ command: clearUserPreferences.type })

    return [{
      preferences: {
        get(key: string) {
          return commands.handlers.invoke(
            getUserPreference.type,
            ...getUserPreference({ key })
          )
        },
        set(key: string, value: string) {
          return commands.handlers.invoke(
            setUserPreference.type,
            ...setUserPreference({ key, value })
          )
        },
        update(key: string, handler: (value: string | undefined) => string) {
          return commands.handlers.invoke(
            updateUserPreference.type,
            ...updateUserPreference({ key, handler })
          )
        },
        clear(key: string) {
          return commands.handlers.invoke(
            clearUserPreference.type,
            ...clearUserPreference({ key })
          )
        },
        clearAll() {
          return commands.handlers.invoke(clearUserPreferences.type)
        }
      }
    }]
  }
}))

export default plugin

export type PreferencesContext = ReturnType<ReturnType<typeof plugin>['init']>[0]

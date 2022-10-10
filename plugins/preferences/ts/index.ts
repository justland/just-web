import { command, CommandsContext } from '@just-web/commands'
import { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'

/**
 * Set the specified user preference.
 * @param key The key of the preference to be update
 */
export const setUserPreference = command<[key: string, value: string]>('just-web.setUserPreference')
export const getUserPreference = command<[key: string], string | undefined>('just-web.getUserPreference')
export const updateUserPreference = command<
  [key: string, handler: (value: string | undefined) => string]
>('just-web.updateUserPreference')

/**
 * Clear the specified user preference.
 * @param key The key of the preference to be cleared
 */
export const clearUserPreference = command<[key: string]>('just-web.clearUserPreference')
export const clearUserPreferences = command('just-web.clearUserPreferences')

const plugin = definePlugin(() => ({
  name: '@just-web/preferences',
  init: ({ commands }: LogContext & CommandsContext) => {
    commands.contributions.add(clearUserPreferences)

    return [{
      preferences: {
        get(key: string) {
          return commands.handlers.invoke(
            getUserPreference.id,
            ...getUserPreference.defineArgs(key)
          )
        },
        set(key: string, value: string) {
          return commands.handlers.invoke(
            setUserPreference.id,
            ...setUserPreference.defineArgs(key, value)
          )
        },
        update(key: string, handler: (value: string | undefined) => string) {
          return commands.handlers.invoke(
            updateUserPreference.id,
            ...updateUserPreference.defineArgs(key, handler)
          )
        },
        clear(key: string) {
          return commands.handlers.invoke(
            clearUserPreference.id,
            ...clearUserPreference.defineArgs(key)
          )
        },
        clearAll() {
          return commands.handlers.invoke(clearUserPreferences.id)
        }
      }
    }]
  }
}))

export default plugin

export type PreferencesContext = ReturnType<ReturnType<typeof plugin>['init']>[0]

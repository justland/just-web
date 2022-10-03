import { CommandsContext } from '@just-web/commands'
import { ContributionsContext } from '@just-web/contributions'
import { LogContext } from '@just-web/log'
import { definePlugin } from '@just-web/types'
import { justEvent } from '@unional/events-plus'
import { AnyRecord } from 'type-plus'

/**
 * Update the specified user preference.
 * @param key The key of the preference to be update
 */
export const updateUserPreference = justEvent<{ key: string, value: string | AnyRecord }>('just-web.updateUserPreference')
export const getUserPreference = justEvent<{ key: string }>('just-web.getUserPreference')

/**
 * Clear the specified user preference.
 * @param key The key of the preference to be cleared
 */
export const clearUserPreference = justEvent<{ key: string }>('just-web.clearUserPreference')
export const clearUserPreferences = justEvent('just-web.clearUserPreferences')

export default definePlugin(() => ({
  name: '@just-web/preferences',
  init: ({ commands, contributions }: LogContext & CommandsContext & ContributionsContext) => {
    contributions.commands.add({ command: updateUserPreference.type })
    contributions.commands.add({ command: getUserPreference.type })
    contributions.commands.add({ command: clearUserPreference.type })
    contributions.commands.add({ command: clearUserPreferences.type })

    return [{
      preferences: {
        get(key: string) {
          return commands.invoke(
            getUserPreference.type,
            ...getUserPreference({ key })
          )
        },
        update(key: string, value: string | AnyRecord) {
          return commands.invoke(
            updateUserPreference.type,
            ...updateUserPreference({ key, value })
          )
        },
        clear(key: string) {
          return commands.invoke(
            clearUserPreference.type,
            ...clearUserPreference({ key })
          )
        },
        clearAll() {
          return commands.invoke(clearUserPreferences.type)
        }
      }
    }]
  }
}))

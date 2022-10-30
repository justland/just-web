import { PreferencesContext } from '@just-web/preferences'
import { nothing } from '@just-web/states'
import { useMemo } from 'react'
import { JSONTypes } from 'type-plus'

/**
 * use `@just-web/preference` for a specific value.
 *
 * @type T Type of the value. It should be JSON serializable.
 *
 * @param app The `just-web` application with `@just-web/preference` (and the specific implementation) loaded.
 * @param id ID of the preference. This will be the key of the value saved.
 * It should be unique within the application/plugin.
 * The current app name will be appended to make it unique across MFE.
 * @param defaultValue Optional. The default value to return if the preference doesn't exist.
 *
 * @return [value, set, update, clear]
 */
export function useUserPreference<T extends JSONTypes>(
  app: PreferencesContext,
  id: string,
  defaultValue?: T
) {
  const preference = useMemo(() => {
    const s = app.preferences.get(id)
    return s ? JSON.parse(s) : defaultValue
  }, [])
  function set(state: T) {
    app.preferences.set(id, JSON.stringify(state))
  }
  function update(handler: (old: T) => T) {
    app.preferences.set(id, (v) => {
      const old = v ? JSON.parse(v) : defaultValue
      return JSON.stringify(handler(old))
    })
  }
  function clear() {
    app.preferences.set(id, () => nothing)
  }
  return [preference, set, update, clear] as const
}

import { CommandsContext } from '@just-web/commands'
import { KeyboardContext } from '@just-web/keyboard'
import { LogContext } from '@just-web/log'
import { getUserPreference, setUserPreference, clearAllUserPreferences } from '@just-web/preferences'
import { AppBaseContext, definePlugin } from '@just-web/types'
import { decode, encode } from 'base-64'
import { ctx } from './index.ctx'

const plugin = definePlugin(() => ({
  name: '@just-web/browser-preferences',
  init({ name, commands, keyboard, log }: AppBaseContext & LogContext & CommandsContext & KeyboardContext) {
    getUserPreference.connect({ commands, keyboard }, (key, defaultValue) => {
      const k = getKey(name, key)
      log.planck(`get: '${k}'`)
      return getItem(k) ?? defaultValue
    })
    setUserPreference.connect({ commands, keyboard }, (key, value) => {
      const k = getKey(name, key)
      const original = getItem(k)
      const v = typeof value === 'function' ? value(original) : value
      if (v === undefined) {
        log.trace(`set: clear '${k}'`)
        ctx.localStorage.removeItem(k)
      }
      else {
        log.trace(`set: '${k}' ${original} -> ${v}`)
        ctx.localStorage.setItem(k, serialize(v))
      }
    })
    clearAllUserPreferences.connect({ commands, keyboard }, () => {
      log.notice(`clear all: '${name}'`)
      const keys: string[] = []
      // have to iterate and get all keys first.
      // removing item mid-loop screw up key index.
      for (let i = 0; i < ctx.localStorage.length; i++) {
        keys.push(ctx.localStorage.key(i)!)
      }
      keys.filter(k => k.startsWith(`${name}:`))
        .forEach(k => {
          log.trace(`clear all: clear '${k}'`)
          ctx.localStorage.removeItem(k)
        })
    })
  }
}))

export default plugin

function getKey(id: string, key: string) {
  return `${id}:${key}`
}

/**
 * @param k resolved key
 */
function getItem(k: string) {
  return deserialize(ctx.localStorage.getItem(k))
}

function serialize(value: string) {
  return encode(value)
}

function deserialize(value: string | null) {
  return value === null ? undefined : decode(value)
}

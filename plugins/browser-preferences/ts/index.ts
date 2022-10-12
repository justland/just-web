import { CommandsContext } from '@just-web/commands'
import { KeyboardContext } from '@just-web/keyboard'
import { LogContext } from '@just-web/log'
import { clearUserPreference, clearUserPreferences, getUserPreference, setUserPreference, updateUserPreference } from '@just-web/preferences'
import { AppBaseContext, definePlugin } from '@just-web/types'
import { decode, encode } from 'base-64'
import { ctx } from './index.ctx'

const plugin = definePlugin(() => ({
  name: '@just-web/browser-preferences',
  init({ name, commands, keyboard, log }: AppBaseContext & LogContext & CommandsContext & KeyboardContext) {
    getUserPreference.connect({ commands, keyboard }, (key) => {
      const k = getKey(name, key)
      log.planck(`get: '${k}'`)
      return deserialize(ctx.localStorage.getItem(k))
    })
    setUserPreference.connect({ commands, keyboard }, (key, value) => {
      const k = getKey(name, key)
      log.trace(`set: '${k}' ${value}`)
      ctx.localStorage.setItem(k, serialize(value))
    })
    updateUserPreference.connect({ commands, keyboard }, (key, handler) => {
      const k = getKey(name, key)
      const original = deserialize(ctx.localStorage.getItem(k))
      const newValue = handler(original)
      log.trace(`update: '${k}' ${original} -> ${newValue}`)
      ctx.localStorage.setItem(k, serialize(newValue))
    })
    clearUserPreference.connect({ commands, keyboard }, (key) => {
      const k = getKey(name, key)
      log.trace(`clear: '${k}'`)
      ctx.localStorage.removeItem(k)
    })
    clearUserPreferences.connect({ commands, keyboard }, () => {
      log.info(`clear all: '${name}'`)
      const keys: string[] = []
      // have to iterate and get all keys first.
      // removing item mid-loop screw up key index.
      for (let i = 0; i < ctx.localStorage.length; i++) {
        keys.push(ctx.localStorage.key(i)!)
      }
      keys.filter(k => k.startsWith(`${name}:`))
        .forEach(key => ctx.localStorage.removeItem(key))
    })
  }
}))

export default plugin

function getKey(id: string, key: string) {
  return `${id}:${key}`
}

function serialize(value: string) {
  return encode(value)
}

function deserialize(value: string | null) {
  return value === null ? undefined : decode(value)
}

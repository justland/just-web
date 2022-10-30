import { CommandsContext } from '@just-web/commands'
import { KeyboardContext } from '@just-web/keyboard'
import { LogContext } from '@just-web/log'
import { clearAllUserPreferences, getUserPreference, setUserPreference } from '@just-web/preferences'
import { nothing, isNothing } from '@just-web/states'
import { AppBaseContext, definePlugin } from '@just-web/types'
import { decode, encode } from 'base-64'
import { produce } from 'immer'
import { isPromise } from 'type-plus'
import { ctx } from './browserPreferences.ctx'

const plugin = definePlugin(() => ({
  name: '@just-web/browser-preferences',
  init({ name, commands, keyboard, log }: AppBaseContext & LogContext & CommandsContext & KeyboardContext) {
    getUserPreference.connect({ commands, keyboard }, (key, defaultValue) => {
      const k = getKey(name, key)
      log.planck(`get: '${k}'`)
      return getItem(k) ?? defaultValue
    })
    setUserPreference.connect({ commands, keyboard }, async (key, value) => {
      const k = getKey(name, key)
      const original = getItem(k)
      const v = typeof value === 'function' ? produce(original, value as any) : value
      if (isPromise(v)) v.then(v => setHandler({ log }, k, original, v))
      else setHandler({ log }, k, original, v)
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

function setHandler({ log }: LogContext, k: string, original: string | undefined, v: string | undefined | typeof nothing) {
  if (isNothing(v) || v === undefined) {
    log.trace(`set: clear '${k}'`)
    ctx.localStorage.removeItem(k)
  }
  else {
    log.trace(`set: '${k}' ${original} -> ${v}`)
    ctx.localStorage.setItem(k, serialize(v))
  }
}

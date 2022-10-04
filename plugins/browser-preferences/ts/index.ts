import { CommandsContext } from '@just-web/commands'
import { LogContext } from '@just-web/log'
import { clearUserPreference, clearUserPreferences, getUserPreference, setUserPreference } from '@just-web/preferences'
import { AppBaseContext, definePlugin } from '@just-web/types'
import { decode, encode } from 'base-64'
import { stringify } from 'flatted'
import { AnyRecord } from 'type-plus'
import { ctx } from './index.ctx'

const plugin = definePlugin(() => ({
  name: '@just-web/browser-preferences',
  init({ name, log, commands }: AppBaseContext & LogContext & CommandsContext) {
    log.notice('init')
    commands.register(
      setUserPreference.type,
      setUserPreference.listener(
        ({ key, value }) => {
          console.info('setting', key, value)
          ctx.localStorage.setItem(getKey(name, key), serialize(value))
        }
      ))
    commands.register(
      getUserPreference.type,
      getUserPreference.listener(
        ({ key }) => deserialize(ctx.localStorage.getItem(getKey(name, key)))
      )
    )
    commands.register(
      clearUserPreference.type,
      clearUserPreference.listener(
        ({ key }) => {
          console.info('removing', key)
          ctx.localStorage.removeItem(getKey(name, key))
        }
      )
    )
    commands.register(
      clearUserPreferences.type,
      clearUserPreferences.listener(
        () => {
          console.info('clearAll start')
          const keys: string[] = []
          // have to iterate and get all keys first.
          // removing item mid-loop screw up key index.
          for (let i = 0; i < ctx.localStorage.length; i++) {
            keys.push(ctx.localStorage.key(i)!)
          }
          console.info('keys', ctx.localStorage.length, keys)
          keys.filter(k => k.startsWith(`${name}:`))
            .forEach(key => {
              console.info('remoing all for ', key)
              ctx.localStorage.removeItem(key)
            })
          console.info('clearAll ends')
        }
      )
    )
  }
}))

export default plugin

function getKey(id: string, key: string) {
  return `${id}:${key}`
}

function serialize(value: string | AnyRecord) {
  return encode(typeof value === 'string' ? value : stringify(value))
}

function deserialize(value: string | null) {
  return value === null ? undefined : decode(value)
}

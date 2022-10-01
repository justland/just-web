import { BrowserContext } from '@just-web/browser'
import type { CommandsContext } from '@just-web/commands'
import { ContributionsContext, KeyBindingContribution } from '@just-web/contributions'
import type { LogContext } from '@just-web/log'
import Mousetrap from 'mousetrap'
import { forEachKey, record } from 'type-plus'
import { ctx } from './keyBindings.ctx'

export namespace startKeyBindings {
  export type Param = BrowserContext & LogContext & ContributionsContext & CommandsContext
}

let keys: Record<string, boolean>
export function startKeyBindings(options: startKeyBindings.Param) {
  const keyBindings = options.contributions.keyBindings

  keys = record()

  keyBindings.list().forEach(keybinding => bindKey(options, keybinding))
  keyBindings.onChange((value) => {
    // TODO: use `immer` patch support to only update the delta
    Mousetrap.reset()
    keys = record()
    forEachKey(value, name => bindKey(options, value[name]))
  })
}

function bindKey({ log: logContext, commands }: startKeyBindings.Param, keyBinding: KeyBindingContribution) {
  const key = getKey(keyBinding)
  if (key) {
    const log = logContext.getLogger('@just-web/browser-contributions')
    if (keys[key]) {
      log.warn(`Registering a duplicate key binding, ignored: ${keyBinding.command} - ${key}`)
    }
    else {
      keys[key] = true
      log.trace(`binding: ${key} -> ${keyBinding.command}`)
      Mousetrap.bind(toMousetrapKey(key), (e) => {
        log.trace(`trigger ${key}`)
        if (e.preventDefault) e.preventDefault()
        commands.invoke(keyBinding.command)
        return false
      })
    }
  }
}

function getKey(keyBinding: any): string {
  if (ctx.isMac()) return (keyBinding.mac ?? keyBinding.key) as string
  return keyBinding.key as string
}

function toMousetrapKey(key: string) {
  return key.replace(/cmd\+/, 'command+')
}
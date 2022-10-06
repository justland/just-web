import type { CommandsContext } from '@just-web/commands'
import { KeyBindingContribution, KeyboardContext } from '@just-web/keyboard'
import type { LogContext } from '@just-web/log'
import { OSContext } from '@just-web/os'
import Mousetrap from 'mousetrap'
import { forEachKey, record } from 'type-plus'

let keys: Record<string, boolean>
export function startKeyBindings(param: LogContext & KeyboardContext & CommandsContext & OSContext) {
  const keyBindings = param.keyboard.keyBindingContributions

  keys = record()

  keyBindings.list().forEach(keybinding => bindKey(param, keybinding))
  keyBindings.onChange((value) => {
    // TODO: use `immer` patch support to only update the delta
    Mousetrap.reset()
    keys = record()
    forEachKey(value, name => bindKey(param, value[name]))
  })
}

function bindKey({ log: logContext, commands, os }: LogContext & CommandsContext & OSContext, keyBinding: KeyBindingContribution) {
  const key = getKey({ os }, keyBinding)
  if (key) {
    const log = logContext.getLogger('@just-web/browser-keyboard')
    if (keys[key]) {
      log.warn(`Registering a duplicate key binding, ignored: ${keyBinding.command} - ${key}`)
    }
    else {
      keys[key] = true
      log.trace(`binding: ${key} -> ${keyBinding.command}`)
      Mousetrap.bind(toMousetrapKey(key), (e) => {
        log.trace(`trigger ${key}`)
        if (e.preventDefault) e.preventDefault()
        commands.handlers.invoke(keyBinding.command)
        return false
      })
    }
  }
}

function getKey(ctx: OSContext, keyBinding: any): string {
  if (ctx.os.isMac()) return (keyBinding.mac ?? keyBinding.key) as string
  return keyBinding.key as string
}

function toMousetrapKey(key: string) {
  return key.replace(/cmd\+/, 'command+')
}

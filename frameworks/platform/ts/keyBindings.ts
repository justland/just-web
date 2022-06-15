import type { CommandsContext } from '@just-web/commands'
import type { KeyBindingContribution, KeyBindingContributionRegistry } from '@just-web/contributions'
import type { LogContext } from '@just-web/log'
import Mousetrap from 'mousetrap'
import { forEachKey, record } from 'type-plus'
import { isMac } from './os'
import type { PlatformContext } from './types'

export namespace startKeyBindings {
  export interface Options {
    log: LogContext,
    platform: PlatformContext,
    commands: CommandsContext,
    contributions: {
      keyBindings: KeyBindingContributionRegistry
    }
  }
}

let keys: Record<string, boolean>
export function startKeyBindings(options: startKeyBindings.Options) {
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

function bindKey({ log: logContext, commands }: startKeyBindings.Options, keyBinding: KeyBindingContribution) {
  const key = getKey(keyBinding)
  if (key) {
    const log = logContext.getLogger('@just-web/platform')
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

function getKey(keyBinding: KeyBindingContribution) {
  if (isMac()) return keyBinding.mac ?? keyBinding.key
  return keyBinding.key
}

function toMousetrapKey(key: string) {
  return key.replace(/cmd\+/, 'command+')
}

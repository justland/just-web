import { CommandRegistry, CommandsContext } from '@just-web/commands'
import { KeyBindingContribution, KeyBindingContributionRegistry } from '@just-web/contributions'
import Mousetrap from 'mousetrap'
import { forEachKey, record } from 'type-plus'
import { log } from './log'
import { isMac } from './os'

export namespace startKeyBindings {
  export interface Options {
    commands: CommandsContext,
    contributions: {
      keyBindings: KeyBindingContributionRegistry
    }
  }
}

let keys: Record<string, boolean>
export function startKeyBindings(options: startKeyBindings.Options) {
  const commandContext = options.commands
  const keyBindings = options.contributions.keyBindings

  keys = record()

  keyBindings.list().forEach(keybinding => bindKey(commandContext, keybinding))
  keyBindings.onChange((value) => {
    // TODO: use `immer` patch support to only update the delta
    Mousetrap.reset()
    keys = record()
    forEachKey(value, name => bindKey(commandContext, value[name]))
  })
}

function bindKey(commandRegistry: CommandRegistry, keyBinding: KeyBindingContribution) {
  const key = getKey(keyBinding)
  if (key) {
    if (keys[key]) {
      log.warn(`Registering a duplicate key binding, ignored: ${keyBinding.command} - ${key}`)
    }
    else {
      keys[key] = true
      log.trace(`binding: ${key} -> ${keyBinding.command}`)
      Mousetrap.bind(toMousetrapKey(key), (e) => {
        log.trace(`trigger ${key}`)
        if (e.preventDefault) e.preventDefault()
        commandRegistry.invoke(keyBinding.command)
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

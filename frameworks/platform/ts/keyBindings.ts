import { CommandRegistry } from '@just-web/commands'
import { KeyBindingContribution, KeyBindingContributionRegistry } from '@just-web/contributions'
import Mousetrap from 'mousetrap'
import { forEachKey, record } from 'type-plus'
import { log } from './log'
import { isMac } from './os'

export namespace startKeyBindings {
  export interface Options {
    commands: {
      registry: CommandRegistry
    },
    contributions: {
      keyBindings: KeyBindingContributionRegistry
    }
  }
}

let keys: Record<string, boolean>
export function startKeyBindings(options: startKeyBindings.Options) {
  const commandRegistry = options.commands.registry
  const keyBindings = options.contributions.keyBindings

  keys = record()

  keyBindings.list().forEach(keybinding => bindKey(commandRegistry, keybinding))
  keyBindings.onChange((value) => {
    // TODO: use `immer` patch support to only update the delta
    Mousetrap.reset()
    keys = record()
    forEachKey(value, name => bindKey(commandRegistry, value[name]))
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
      Mousetrap.bind(key, () => (commandRegistry.invoke(keyBinding.command), false))
    }
  }
}

function getKey(keyBinding: KeyBindingContribution) {
  if (isMac()) return keyBinding.mac ?? keyBinding.key
  return keyBinding.key
}

import { createRegistry, ReadonlyRegistry, Registry, withAdder, WithAdder } from '@just-web/states'
import { record } from 'type-plus'
import { log } from './log'

export interface KeyBindingContribution {
  /**
   * Command to bind to.
   */
  command: string,
  /**
   * Default key
   */
  key?: string,
  /**
   * MacOS specific key
   */
  mac?: string
}

export interface ReadonlyKeyBindingContributionRegistry
  extends ReadonlyRegistry<string, KeyBindingContribution> { }

export interface KeyBindingContributionRegistry
  extends Registry<string, KeyBindingContribution>, WithAdder<KeyBindingContribution> { }

export namespace keyBindingRegistry {
  export interface Options {
    keyBindings?: Record<string, KeyBindingContribution>,
  }
}

export function keyBindingRegistry(
  options?: keyBindingRegistry.Options
): KeyBindingContributionRegistry {
  return withAdder(
    createRegistry<string, KeyBindingContribution>(options?.keyBindings ?? record()),
    function (r, kb) {
      const key = kb.command
      if (r[key]) return log.warn(`Registering a duplicate key binding contribution, ignored: ${key}`)
      r[key] = kb
    })
}

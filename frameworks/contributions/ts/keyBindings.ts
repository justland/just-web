import { Adder, adder, createRegistry, Registry } from '@just-web/states'
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

export interface KeyBindingContributionRegistry extends Registry<KeyBindingContribution> {
  add: Adder<KeyBindingContribution>
}

export namespace keyBindingRegistry {
  export interface Options {
    keyBindings: Record<string, KeyBindingContribution>,
  }
}

export function keyBindingRegistry(
  options: keyBindingRegistry.Options
): KeyBindingContributionRegistry {
  const registry = createRegistry<KeyBindingContribution>(options.keyBindings)
  return {
    ...registry,
    add: adder(registry, function (r, kb) {
      const key = kb.command
      if (r[key]) return log.warn(`Registering a duplicate key binding contribution, ignored: ${key}`)
      r[key] = kb
    })
  }
}

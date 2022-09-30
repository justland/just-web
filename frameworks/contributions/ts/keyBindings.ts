import { LogContext } from '@just-web/log'
import { createRegistry, ReadonlyRegistry, Registry, withAdder, WithAdder } from '@just-web/states'
import { record } from 'type-plus'

export type KeyBindingContribution = {
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
} | {
  /**
   * Command to bind to.
   */
  command: string,
  /**
   * MacOS specific key
   */
  mac: string,

  /**
   * No default key
   */
  key?: undefined
}

export interface ReadonlyKeyBindingContributionRegistry
  extends ReadonlyRegistry<string, KeyBindingContribution> { }

export interface KeyBindingContributionRegistry
  extends Registry<string, KeyBindingContribution>, WithAdder<KeyBindingContribution> { }

export namespace keyBindingRegistry {
  export type Options = Array<KeyBindingContribution>
}

export function keyBindingRegistry(
  ctx: LogContext,
  options?: keyBindingRegistry.Options,
): KeyBindingContributionRegistry {
  return withAdder(
    createRegistry<string, KeyBindingContribution>(getInitRecord(options)),
    function (r, kb) {
      const key = kb.command
      const log = ctx.log.getLogger('@just-web/contributions')
      if (r[key]) return log.warn(`Registering a duplicate key binding contribution, ignored: ${key}`)
      r[key] = kb
    })
}

function getInitRecord(options?: keyBindingRegistry.Options) {
  return (options ?? []).reduce((p, c) => {
    p[c.command] = c
    return p
  }, record<string, KeyBindingContribution>())
}

import { Adder, adder, createRegistry, ReadonlyRegistry, Registry } from '@just-web/states'
import { record } from 'type-plus'
import { log } from './log'

export interface CommandContribution {
  /**
   * The command id. e.g. `just-web.showCommandPalette`
   */
  command: string,
  /**
   * Name of the command such as `Show command palette`.
   * If not specified,
   * it is default to Sentence case of the second part of the `id`.
   */
  name?: string,
  /**
   * Detail description about the command.
   * It will support some formatting such as markdown,
   * but not confirmed yet.
   */
  description?: string
}

export interface ReadonlyCommandContributionRegistry extends ReadonlyRegistry<string, CommandContribution> { }

export interface CommandContributionRegistry extends Registry<string, CommandContribution> {
  add: Adder<CommandContribution>
}

export namespace commandContributionRegistry {
  export interface Options {
    commands?: Record<string, CommandContribution>,
  }
}

export function commandContributionRegistry(
  options?: commandContributionRegistry.Options
): CommandContributionRegistry {
  const registry = createRegistry<string, CommandContribution>(options?.commands ?? record())
  return {
    ...registry,
    add: adder(registry, function (r, cmd) {
      const key = cmd.command
      if (r[key]) return log.error(`Registering a duplicate command contribution, ignored: ${key}`)
      r[key] = cmd
    })
  }
}

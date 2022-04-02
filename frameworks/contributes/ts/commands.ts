import { buildAdd, createRegistry } from '@just-web/states'
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

export namespace commandContributionRegistry {
  export interface Options {
    commands: Record<string, CommandContribution>,
  }
}

export function commandContributionRegistry(options: commandContributionRegistry.Options) {
  const registry = createRegistry<CommandContribution>(options.commands)
  return {
    ...registry,
    add: buildAdd(registry, function (r, cmd) {
      const key = cmd.command
      if (r[key]) return log.error(`Registering a duplicate command contribution, ignored: ${key}`)
      r[key] = cmd
    })
  }
}

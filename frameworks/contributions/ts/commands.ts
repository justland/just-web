import { LogContext } from '@just-web/log'
import { createRegistry, ReadonlyRegistry, Registry, withAdder, WithAdder } from '@just-web/states'
import { record } from 'type-plus'

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
  description?: string,
  /**
   * By default, all commands will be available to the command palette.
   * Set this to false to prevent it from appearing in the command palette.
   */
  commandPalette?: false
}

export interface ReadonlyCommandContributionRegistry
  extends ReadonlyRegistry<string, CommandContribution> { }

export interface CommandContributionRegistry
  extends Registry<string, CommandContribution>, WithAdder<CommandContribution> { }

export namespace commandContributionRegistry {
  export interface Context {
    logContext: LogContext
  }
  export interface Options {
    commands?: Record<string, CommandContribution>,
  }
}

export function commandContributionRegistry(
  { logContext }: commandContributionRegistry.Context,
  options?: commandContributionRegistry.Options,
): CommandContributionRegistry {
  return withAdder(
    createRegistry<string, CommandContribution>(options?.commands ?? record()),
    function (r, cmd) {
      const key = cmd.command
      const log = logContext.getLogger('@just-web/contributions')
      if (r[key]) return log.error(`Registering a duplicate command contribution, ignored: ${key}`)
      r[key] = cmd
    })
}

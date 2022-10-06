
import type { LogContext } from '@just-web/log'
import type { Registry, WithAdder } from '@just-web/states'
import { createRegistry, withAdder } from '@just-web/states'
import { record } from 'type-plus'
import { CommandContribution } from './types'

export interface ContributionRegistry
  extends Registry<string, CommandContribution>, WithAdder<CommandContribution> { }

export namespace contributionRegistry {
  export type Options = CommandContribution[]
}

export function contributionRegistry(
  ctx: LogContext,
  options?: contributionRegistry.Options,
): ContributionRegistry {
  return withAdder(
    createRegistry<string, CommandContribution>(getInitRecord(options)),
    function (r, cmd) {
      const key = cmd.command
      const log = ctx.log.getLogger('@just-web/contributions')
      if (r[key]) return log.error(`Registering a duplicate command contribution, ignored: ${key}`)
      r[key] = cmd
    })
}

function getInitRecord(options?: contributionRegistry.Options) {
  return (options ?? []).reduce((p, c) => {
    p[c.command] = c
    return p
  }, record<string, CommandContribution>())
}

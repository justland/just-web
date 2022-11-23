
import type { LogContext } from '@just-web/log'
import { createRegistry, withAdder } from '@just-web/states'
import { record } from 'type-plus'
import type { CommandContribution, ContributionRegistry } from './types.js'

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
      const key = cmd.id
      if (r[key]) return ctx.log.error(`Registering a duplicate command contribution, ignored: ${key}`)
      r[key] = cmd
    })
}

function getInitRecord(options?: contributionRegistry.Options) {
  return (options ?? []).reduce((p, c) => {
    p[c.id] = c
    return p
  }, record<string, CommandContribution>())
}

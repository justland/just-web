import { sentenceCase } from 'sentence-case'
import type { CommandContribution } from './types'

export function formatCommand(cmd: CommandContribution) {
  return {
    id: cmd.id,
    name: cmd.name ?? generateName(cmd.id),
    description: cmd.description
  }
}

function generateName(command: string) {
  const i = command.indexOf('.')
  return sentenceCase(command.slice(i))
}

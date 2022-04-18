import { CommandContribution } from '@just-web/contributions'
import { sentenceCase } from 'sentence-case'

export function formatCommand(cmd: CommandContribution) {
  return {
    command: cmd.command,
    name: cmd.name ?? generateName(cmd.command),
    description: cmd.description
  }
}

function generateName(command: string) {
  const i = command.indexOf('.')
  return sentenceCase(command.slice(i))
}

import { Omit } from 'type-plus'
import { commands, log } from './store'
import { Command } from './types'

export function registerCommand(id: string, command: Omit<Command, 'id'>) {
  if (commands.has(id)) {
    log.warn(`The command '${id}' was already registered`)
    return
  }
  commands.set(id, { ...command, id })
}

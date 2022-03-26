import { Omit } from 'type-plus'
import { commands } from './store'
import { Command } from './types'

export function registerCommand(id: string, command: Omit<Command, 'id'>) {
  commands.set(id, { ...command, id })
}

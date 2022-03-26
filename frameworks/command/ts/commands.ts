import { Omit } from 'type-plus'
import { commands, log } from './store'
import { Command } from './types'

export type CommandRegistration = Omit<Command, 'id'>

export function registerCommand(id: string, command: CommandRegistration) {
  if (commands.has(id)) log.warn(`Registering an already registered command: '${id}'`)
  else commands.set(id, { ...command, id })
}

export function invokeCommand(id: string) {
  const cmd = commands.get(id)
  cmd ? cmd.handler() : log.error(`Invoking not registered command: '${id}'`)
}

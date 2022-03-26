import { Omit } from 'type-plus'
import { Map } from 'immutable'
import { log } from './store'
import { Command } from './types'

let commands = Map<string, Command>()

export type CommandRegistration = Omit<Command, 'id'>

export function registerCommand(id: string, command: CommandRegistration) {
  log.trace('registerCommand', id)
  if (commands.has(id)) {
    log.warn(`Registering an already registered command: '${id}'`)
    return
  }
  const cmd = { ...command, id }
  console.log('register', command, cmd)
  commands = commands.set(id, cmd)
}

export function invokeCommand(id: string) {
  log.trace('invokeCommand', id)
  const cmd = commands.get(id)
  cmd ? cmd.handler() : log.error(`Invoking not registered command: '${id}'`)
}


/**
 * Gets commands in an array.
 * ? Don't know if this is a good idea as it eliminates the benefits of immutables
 */
export function getCommands() {
  return commands.toArray().map(v => v[1])
}

export function clearCommands() {
  log.trace('clearCommands')
  commands = commands.clear()
}

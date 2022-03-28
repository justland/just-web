import produce from 'immer'
import { Omit } from 'type-plus'
import { store } from './store'
import { log } from './log'
import { Command } from './types'

export type CommandRegistration = Omit<Command, 'id'>

export function getCommands() {
  return store.getCommands()
}

export function registerCommand(id: string, command: CommandRegistration) {
  log.trace('registerCommand', id)
  const commands = store.getCommands()
  if (commands.has(id)) {
    log.warn(`Registering an already registered command: '${id}'`)
    return
  }
  const cmd = { ...command, id }
  store.setCommands(produce(commands, m => m.set(id, cmd)))
}

export function invokeCommand(id: string) {
  log.trace('invokeCommand', id)
  const cmd = store.getCommands().get(id)
  cmd ? cmd.handler() : log.error(`Invoking not registered command: '${id}'`)
}


export function clearCommands() {
  log.trace('clearCommands')
  store.setCommands(produce(
    store.getCommands(),
    (m: Map<string, Command>) => void m.clear()))
}

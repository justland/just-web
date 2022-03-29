import produce from 'immer'
import { Omit } from 'type-plus'
import { store } from './store'
import { log } from './log'
import { Command } from './types'

export type CommandRegistration = Omit<Command, 'id'>

export function getCommands() {
  return store.get()
}

export function registerCommand(id: string, command: CommandRegistration) {
  log.trace('registerCommand', id)
  const commands = store.get()
  if (commands[id]) {
    log.warn(`Registering an already registered command: '${id}'`)
    return
  }
  store.set(produce(commands, m => { m[id] = { ...command, id } }))
}

export function invokeCommand(id: string) {
  log.trace('invokeCommand', id)
  const cmd = store.get()[id]
  cmd ? cmd.handler() : log.error(`Invoking not registered command: '${id}'`)
}


export function clearCommands() {
  log.trace('clearCommands')
  store.set(produce(store.get(), () => Object.create(null)))
}

import produce from 'immer'
import { log } from './log'
import { store } from './store'

export function getCommands() {
  return store.get()
}

export function registerCommand(id: string, handler: () => void) {
  log.trace('registerCommand', id)
  const commands = store.get()
  if (commands[id]) {
    log.warn(`Registering an already registered command: '${id}'`)
    return
  }
  store.set(produce(commands, m => { m[id] = handler }))
}

export function invokeCommand(id: string) {
  log.trace('invokeCommand', id)
  const handler = store.get()[id]
  handler ? handler() : log.error(`Invoking not registered command: '${id}'`)
}


export function clearCommands() {
  log.trace('clearCommands')
  store.set(produce(store.get(), () => Object.create(null)))
}

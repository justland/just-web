import { createStore } from '@just-web/states'
import { Command } from './types'

export const store = createStore<Record<string, Command>>(Object.create(null))

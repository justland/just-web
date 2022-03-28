import { createStore } from '@just-web/states'
import { Command } from './types'

export const store = createStore(new Map<string, Command>())

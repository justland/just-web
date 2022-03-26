import { getLogger } from 'standard-log'
import { Command } from './types'

export const commands = new Map<string, Command>()

export const log = getLogger('@just-web/command')

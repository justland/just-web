import { Context, createContext, toReadonlyContext } from '@just-web/contexts'
import { FC } from 'react'
import { setContext } from '../context'
import CommandPalette, { CommandPaletteProps } from './CommandPalette'

export default {
  component: CommandPalette
}

interface Contribution {
  command: string,
  name?: string,
  key?: string,
  mac?: string
}

function addCommand(ctx: Context, ...inputs: Array<Contribution>) {
  inputs.forEach(entry => {
    ctx.contributions.commands.add({ command: entry.command, description: entry.name })
    ctx.commands.registry.register(entry.command, () => { alert(entry.command) })
    if (entry.key || entry.mac) {
      ctx.contributions.keyBindings.add(entry)
    }
  })
}

const simpleCmd: Contribution = { command: 'core.simpleCommand' }
const keyedCmd = {
  command: 'core.keyedCommand',
  name: 'Command with key',
  key: 'ctrl+s'
}
const macCmd = {
  command: 'core.macCommand',
  name: 'Command with mac key override',
  key: 'ctrl+s',
  mac: 'cmd+s'
}
const macOnlyCmd = {
  command: 'core.macOnlyCommand',
  name: 'Command with only mac key',
  mac: 'cmd+s'
}


const Story: FC<CommandPaletteProps> = ({ ...args }) => {
  return <>
    <div>ctrl+p to show the command palette</div>
    <CommandPalette {...args} />
  </>
}

export const NoCommand = () => {
  const context = createContext()
  setContext(toReadonlyContext(context))
  return <Story />
}


export const OneCommand = () => {
  const context = createContext()
  addCommand(context, simpleCmd)
  setContext(toReadonlyContext(context))
  return <Story />
}

export const WithKey = () => {
  const context = createContext()
  addCommand(context, keyedCmd)
  setContext(toReadonlyContext(context))
  return <Story />
}

export const OverrideMacCommandInMac = () => {
  const context = createContext()
  context.platform = {
    isMacOS: () => true
  }
  addCommand(context, simpleCmd, keyedCmd, macCmd, macOnlyCmd)
  setContext(toReadonlyContext(context))
  return <Story />
}

export const OverrideMacCommandInWindow = () => {
  const context = createContext()
  context.platform = {
    isMacOS: () => false
  }
  addCommand(context, simpleCmd, keyedCmd, macCmd, macOnlyCmd)
  setContext(toReadonlyContext(context))
  return <Story />
}

import { Context, createContext } from '@just-web/contexts'
import { ComponentStory } from '@storybook/react'
import Mousetrap from 'mousetrap'
import { activate } from '../module'
import CommandPalette from './CommandPalette'


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

const Story: ComponentStory<typeof CommandPalette> = ({ ...args }) => {
  return <>
    <div>ctrl+p to show the command palette</div>
    <CommandPalette {...args} />
  </>
}

export const NoCommand = () => {
  const context = createContext()
  activate(context)
  return <Story />
}

NoCommand.play = async () => {
  Mousetrap.trigger('ctrl+p')
}

export const OneCommand = () => {
  const context = createContext()
  addCommand(context, simpleCmd)
  activate(context)
  return <Story />
}

OneCommand.play = async () => {
  Mousetrap.trigger('ctrl+p')
}

export const WithKey = () => {
  const context = createContext()
  addCommand(context, keyedCmd)
  activate(context)
  return <Story />
}

WithKey.play = async () => {
  Mousetrap.trigger('ctrl+p')
}

export const OverrideMacCommandInMac = () => {
  const context = createContext()
  context.platform = {
    ...context.platform,
    isMac: () => true
  }
  addCommand(context, simpleCmd, keyedCmd, macCmd, macOnlyCmd)
  activate(context)
  return <Story />
}

OverrideMacCommandInMac.play = async () => {
  Mousetrap.trigger('ctrl+p')
}

export const OverrideMacCommandInWindow = () => {
  const context = createContext()
  context.platform = {
    ...context.platform,
    isMac: () => false
  }
  addCommand(context, simpleCmd, keyedCmd, macCmd, macOnlyCmd)
  activate(context)
  return <Story />
}

OverrideMacCommandInWindow.play = async () => {
  Mousetrap.trigger('ctrl+p')
}

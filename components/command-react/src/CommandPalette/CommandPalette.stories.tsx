import { registerCommand } from '@just-web/commands'
import { commands, Command, KeyBinding, keyBindings } from '@just-web/contributes'
import { FC } from 'react'
import { produce } from 'immer'
import { pick, record, RequiredPick, stub } from 'type-plus'
import CommandPalette, { CommandPaletteProps } from './CommandPalette'

export default {
  component: CommandPalette
}

function addCommand(...inputs: Array<RequiredPick<stub.Param<Command & KeyBinding>, 'command'>>) {
  inputs.forEach(input => {
    registerCommand(input.command, () => { alert(input.command) })
    commands.set(produce(commands.get(), cmds => {
      cmds[input.command] = pick(input, 'command', 'name', 'description')
    }))
    if (input.key || input.mac) {
      keyBindings.set(produce(keyBindings.get(), kbs => {
        kbs[input.command] = pick(input, 'command', 'key', 'mac')
      }))
    }
  })
}

function reset() {
  commands.set(record())
  keyBindings.set(record())
}

const simpleCmd = { command: 'core.simpleCommand' }
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
  reset()
  return <Story ctx={{ commands, keyBindings }} />
}


export const OneCommand = () => {
  reset()
  addCommand(simpleCmd)
  return <Story />
}

export const WithKey = () => {
  reset()
  addCommand(keyedCmd)
  return <Story />
}

export const OverrideMacCommandInMac = () => {
  reset()
  addCommand(simpleCmd, keyedCmd, macCmd, macOnlyCmd)
  return <Story ctx={{ isMacOS: () => true }} />
}

export const OverrideMacCommandInWindow = () => {
  reset()
  addCommand(simpleCmd, keyedCmd, macCmd, macOnlyCmd)
  return <Story ctx={{ isMacOS: () => false }} />
}

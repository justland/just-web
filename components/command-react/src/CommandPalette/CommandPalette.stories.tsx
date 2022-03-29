import { Command, KeyBinding, registerCommand } from '@just-web/commands'
import { FC } from 'react'
import { stub } from 'type-plus'
import CommandPalette, { CommandPaletteProps } from './CommandPalette'

export default {
  component: CommandPalette
}

const Story: FC<CommandPaletteProps> = ({ commands, ...args }) => <>
  <div>ctrl+p to show the command palette</div>
  <CommandPalette commands={commands} {...args} />
</>

function cmd(input: stub.Param<Command & KeyBinding>) {
  return stub<Command & KeyBinding>({ handler() { alert(input.id) }, ...input })
}

const simpleCmd = cmd({ id: 'core.simpleCommand', description: 'Simple command' })
registerCommand(simpleCmd.id, simpleCmd)

const keyCmd = cmd({
  description: 'Command with key',
  id: 'core.keyedCommand',
  key: 'ctrl+s'
})
registerCommand(keyCmd.id, keyCmd)

const macCmd = cmd({
  description: 'Command with mac key override',
  id: 'core.macCommand',
  key: 'ctrl+s',
  mac: 'cmd+s'
})
registerCommand(macCmd.id, macCmd)

export const NoCommand = () => <Story commands={[]} />

export const OneCommand = () => <Story commands={[simpleCmd]} />

export const WithKey = () => <Story commands={[keyCmd]} />

export const OverrideMacCommandInMac = () => <Story
  commands={[keyCmd, macCmd]}
  ctx={{ isMacOS: () => true }} />

export const OverrideMacCommandInWindow = () => <Story
  commands={[keyCmd, macCmd]}
  ctx={{ isMacOS: () => false }} />

import { Command, KeyBinding } from '@just-web/command'
import { FC } from 'react'
import { stub, Stub } from 'type-plus'
import CommandPalette, { CommandPaletteProps } from './CommandPalette'

export default {
  component: CommandPalette
}

const Story: FC<CommandPaletteProps> = ({ commands, ...args }) => <>
  <div>ctrl+p to show the command palette</div>
  <CommandPalette commands={commands} {...args} />
</>

function cmd(input: Stub<Command & KeyBinding>) {
  return stub<Command & KeyBinding>({ handler() { alert(input.id) }, ...input })
}

const simpleCmd = cmd({ id: 'core.simpleCommand', description: 'Simple command' })

const keyCmd = cmd({
  description: 'Simple command',
  id: 'core.simpleCommand',
  key: 'ctrl+s'
})

const macCmd = cmd({
  description: 'Simple command',
  id: 'core.simpleCommand',
  mac: 'ctrl+s'
})

export const NoCommand = () => <Story commands={[]} />

export const OneCommand = () => <Story commands={[simpleCmd]} />

export const WithOneKey = () => <Story commands={[keyCmd, keyCmd, keyCmd]} />

export const WithKeyInMac = () => <Story
  commands={[macCmd, macCmd, macCmd]}
  ctx={{ isMacOS: () => true }} />

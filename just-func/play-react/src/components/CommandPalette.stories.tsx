import { FC } from 'react'
import CommandPalette, { CommandPaletteProps } from './CommandPalette'

export default {
  component: CommandPalette
}

const Story: FC<CommandPaletteProps> = ({ commands, ...args }) => <>
  <div>ctrl+p to show the command palette</div>
  <CommandPalette commands={commands} {...args} />
</>

export const NoCommand = () => <Story commands={[]} />

export const OneCommand = () => <Story commands={[{
  title: 'Simple command',
  command: 'core.simpleCommand',
}]} />

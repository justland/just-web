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

export const WithOneKey = () => <Story commands={[{
  title: 'Simple command',
  command: 'core.simpleCommand',
  key: 'ctrl+s'
}, {
  title: 'Simple command',
  command: 'core.simpleCommand',
  key: 'ctrl+s'
}, {
  title: 'Simple command',
  command: 'core.simpleCommand',
  key: 'ctrl+s'
}]} />

export const WithKeyInMac = () => <Story commands={[{
  title: 'Simple command',
  command: 'core.simpleCommand',
  mac: 'cmd+s'
}, {
  title: 'Simple command',
  command: 'core.simpleCommand',
  mac: 'cmd+s'
}, {
  title: 'Simple command',
  command: 'core.simpleCommand',
  mac: 'cmd+s'
}]} ctx={{ isMacOS: () => true }} />

import { Command, KeyBinding } from '@just-web/command'
import { isMacOS } from '@just-web/platform'
import { FC } from 'react'
import CP from 'react-command-palette'
import theme from 'react-command-palette/dist/themes/atom-theme'
import { required } from 'type-plus'
import styles from './CommandPalette.module.css'

export interface CommandPaletteCtx { isMacOS: typeof isMacOS }

export interface CommandPaletteProps {
  ctx?: Partial<CommandPaletteCtx>,
  commands: Array<Command & KeyBinding>
}

function toPaletteCommands(cmds: CommandPaletteProps['commands'], ctx: CommandPaletteCtx) {
  const m = ctx.isMacOS()
  return cmds.map(c => ({
    name: c.id,
    key: m ? c.mac : c.key,
    command: () => alert(JSON.stringify({ type: 'COMMAND_INVOKE', payload: c.id }))
  }))
}

const RenderCommand: FC<{ name: string, key?: string }> =
  command => <div className={styles['suggestion']}>
    <span className={styles['name']}>{command.name}</span>
    {command.key && <span className={styles['key']}>{command.key}</span>}
  </div>

const CommandPalette: FC<CommandPaletteProps> = (props) => {
  const ctx = required({ isMacOS }, props.ctx)
  const commands = toPaletteCommands(props.commands, ctx)
  return <CP
    commands={commands}
    closeOnSelect={true}
    open={true}
    hotKeys={'ctrl+p'}
    theme={{ ...theme, trigger: styles['command-palette-trigger'] }}
    renderCommand={RenderCommand}
  />
}

export default CommandPalette

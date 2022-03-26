import { Command, invokeCommand, KeyBinding } from '@just-web/command'
import { isMacOS } from '@just-web/platform'
import { FC } from 'react'
import CP from 'react-command-palette'
import theme from 'react-command-palette/dist/themes/atom-theme'
import { Omit, required } from 'type-plus'
import styles from './CommandPalette.module.css'

export interface CommandPaletteCtx { isMacOS: typeof isMacOS }

export type CommandPaletteCommand = Omit<Command, 'handler'> & Omit<KeyBinding, 'when'>

export interface CommandPaletteProps {
  ctx?: Partial<CommandPaletteCtx>,
  commands: Array<CommandPaletteCommand>
}

function toPaletteCommands(cmds: CommandPaletteProps['commands'], ctx: CommandPaletteCtx) {
  const m = ctx.isMacOS()
  return cmds.map(c => ({
    name: c.id,
    key: m ? c.mac ?? c.key : c.key,
    command: () => invokeCommand(c.id)
  }))
}

const RenderCommand: FC<{ name: string, key?: string }> =
  command => <div className={styles.suggestion}>
    <span className={styles.name}>{command.name}</span>
    {command.key && <span className={styles.key}>{command.key}</span>}
  </div>

const CommandPalette: FC<CommandPaletteProps> = (props) => {
  const ctx = required({ isMacOS }, props.ctx)
  const commands = toPaletteCommands(props.commands, ctx)
  return <CP
    commands={commands}
    closeOnSelect={true}
    open={true}
    hotKeys={'ctrl+p'}
    theme={{ ...theme, trigger: styles.trigger }}
    renderCommand={RenderCommand}
  />
}

export default CommandPalette

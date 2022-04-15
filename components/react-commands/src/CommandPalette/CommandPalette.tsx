import { ReadonlyContext } from '@just-web/contexts'
import type { CommandContribution, KeyBindingContribution } from '@just-web/contributions'
import { sentenceCase } from '@just-web/format'
import { useState, VFC } from 'react'
import CP from 'react-command-palette'
import theme from 'react-command-palette/dist/themes/atom-theme'
import { required } from 'type-plus'
import { getStore } from '../store'
import styles from './CommandPalette.module.css'

export type CommandPaletteCommand = CommandContribution & KeyBindingContribution

export interface CommandPaletteProps {
  ctx?: ReadonlyContext
}

function getCommands(ctx: ReadonlyContext) {
  const m = ctx.platform.isMac()
  const cmds = ctx.contributions.commands.get()
  const kbs = ctx.contributions.keyBindings.get()
  return Object.values(cmds)
    .filter(c => c.commandPalette !== false)
    .map(c => {
      const r = {
        ...c,
        name: c.name ?? sentenceCase(c.command.split('.', 2)[1]),
        command: () => ctx.commands.invoke(c.command)
      }
      const k = kbs[c.command]
      return k ? { ...r, key: m ? k.mac ?? k.key : k.key } : r
    })
}

const RenderCommand: VFC<{ name: string, key?: string }> = command => (
  <div className={styles.suggestion}>
    <span className={styles.name}>{command.name}</span>
    {command.key && <span className={styles.key}>{command.key}</span>}
  </div>
)

const CommandPalette: VFC<CommandPaletteProps> = (props) => {
  const store = getStore()
  const ctx = required(store.get().context, props.ctx)
  const commands = getCommands(ctx)
  const [open, setOpen] = useState(false)

  store.onChange(s => setOpen(s.openCommandPalette))
  const onRequestClose = () => store.update(s => { s.openCommandPalette = false })

  return <CP
    commands={commands}
    closeOnSelect={true}
    open={open}
    theme={{ ...theme, trigger: styles.trigger }}
    onRequestClose={onRequestClose}
    renderCommand={RenderCommand}
  />
}

export default CommandPalette

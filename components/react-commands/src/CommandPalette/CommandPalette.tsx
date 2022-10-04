import { CommandsContext } from '@just-web/commands'
import { CommandContribution, ContributionsContext, formatCommand, formatKeyBinding, KeyBindingContribution } from '@just-web/contributions'
import { OSContext } from '@just-web/os'
import { useStore } from '@just-web/react'
import { useCallback, VFC } from 'react'
import CP from 'react-command-palette'
import theme from 'react-command-palette/dist/themes/atom-theme'
import { required } from 'type-plus'
import { getStore } from '../store'
import styles from './CommandPalette.module.css'

export type CommandPaletteCommand = CommandContribution & KeyBindingContribution

export interface CommandPaletteProps {
  ctx?: ContributionsContext & CommandsContext
}

function getCommands(ctx: ContributionsContext & CommandsContext & OSContext) {
  const cmds = ctx.contributions.commands.get()
  const kbs = ctx.contributions.keyBindings.get()
  return Object.values(cmds)
    .filter(c => c.commandPalette !== false)
    .map(c => {
      const r = {
        ...c,
        name: formatCommand(c).name,
        command: () => ctx.commands.invoke(c.command)
      }
      const k = kbs[c.command]
      return k ? { ...r, key: formatKeyBinding(ctx, k).key } : r
    })
}

const RenderCommand: VFC<{ name: string, key?: string }> = command => (
  <div className={styles.suggestion}>
    <span className={styles.name}>{command.name}</span>
    {command.key && <span className={styles.key}>{command.key}</span>}
  </div>
)

const CommandPalette = (props: CommandPaletteProps) => {
  const store = getStore()
  const [open, setOpen] = useStore(store,
    s => s.openCommandPalette,
    (s, open) => { s.openCommandPalette = open }
  )
  const log = store.get().context.log
  log.trace('rendering CommandPalette, open:', open)
  const commands = open ? getCommands(required(store.get().context, props.ctx)) : []

  const onRequestClose = useCallback(() => setOpen(false), [])

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

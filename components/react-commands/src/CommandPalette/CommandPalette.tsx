import { CommandsContext } from '@just-web/commands'
import { CommandContribution, ContributionsContext, formatCommand, formatKeyBinding, KeyBindingContribution } from '@just-web/contributions'
import { OSContext } from '@just-web/os'
import { useStore } from '@just-web/react'
import { ComponentType, ReactElement, useCallback, VFC } from 'react'
import CP from 'react-command-palette'
import { AnyFunction } from 'type-plus'
import { getStore } from '../store'
import styles from './CommandPalette.module.css'

export type CommandPaletteCommand = Omit<CommandContribution & KeyBindingContribution, 'command'> & {
  name: string,
  command(): void,
  key?: string,
}

/**
 * A subset of `react-command-palette` props.
 * @see https://github.com/asabaylus/react-command-palette#props
 */
export type CommandPaletteProps = {
  /**
   * one of "modal" or "inline", when set to "modal" the command palette is rendered centered inside a modal. When set to "inline", it is render inline with other page content. Defaults to "modal".
   */
  display?: 'modal' | 'inline',
  /**
   * a string or a React.ComponentType which provides a helpful description for the usage of the command palette. The component is displayed at the top of the command palette. The header is not displayed by default. see: src/examples/sampleInstruction.js for reference.
   */
  header?: string | ComponentType,
  /**
   * a boolean, when set to true the command palette will close immediately when the user makes a selection. Defaults to "false".
   */
  closeOnSelect?: boolean,
  /**
   * a boolean which indicates whether to reset the user's query to `defaultInputValue` when the command palette opens. Defaults to "false".
   */
  resetInputOnOpen?: boolean,
  /**
   * a boolean which resets the components commands to the initial data provided to `props.commands` every time the command palette is opened.
   */
  resetCommandsOnOpen?: boolean,
  /**
   * a string that contains a short text description which is displayed inside the the input field until the user provides input. Defaults to "Type a command".
   */
  placeholder?: string,
  // This can be used for VS Code lik `> ...` and `# ...` feature.
  /**
   * a string that determines the value of the text in the input field. By default the defaultInputValue is an empty string.
   */
  defaultInputValue?: string,
  /**
   *  a function, when suggestion is clicked, react-autosuggest needs to populate the input element based on the clicked suggestion. Teach react-autosuggest how to calculate the input value for every given suggestion. By default the highlighed suggestion will be displayed
   */
  getSuggestionValue?: (suggestion: CommandPaletteCommand) => string,
  /**
   * a boolean, will automatically highlight the first suggestion. Defaults to "true".
   */
  highlightFirstSuggestion?: boolean,
  /**
   * options controls how fuzzy search is configured. Note: use at your own risk, this is likely to change in the future. The search options are derived from these fuzzysort options. However the command palette options prop must have the following values included to function correctly:
   * @see https://github.com/farzher/fuzzysort#options
   */
  options?: {
    key?: string,
    keys?: string[],
    threshold?: number,
    limit?: number,
    allowTypo?: boolean,
    scoreFn?: null | AnyFunction
  },
  /**
   * a function that filters searched input. If this prop is not used the default behavior will search using the input exactly as it was entered by the user. Otherwise whatever gets returned by your function is the text that will be searched. You might use this filter out extraneous characters such as ">" or "?" like VS Code does for action keys, ex:
   */
  filterSearchQuery?: (inputValue: string) => string,
  /**
   * a function that's called when the input value changes. It returns two values: the current value of the input field followed by the users typed input. The query ignores keyboard navigation and clicks.
   */
  onChange?: (inputValue: string, userQuery: string) => void,
  /**
   * a function that's called when the highlighted suggestion changes.
   */
  onHighlight?: (suggestion: string) => void,
  /**
   * a function that's called when the selected suggestion changes, given the user selects an item or the user clear the selection. It's called with the item that was selected or null.
   */
  onSelect?: (command: CommandPaletteCommand) => void,
  /**
   * a function that fires after the command palette modal is opened.
   */
  onAfterOpen?: () => void,
  /**
   * a function that will be run when the modal is requested to be closed (either by clicking on overlay or pressing ESC). Note: It is not called if open is changed by other means. Passes through to the react-modal prop.
   * @see http://reactcommunity.org/react-modal/examples/on_request_close.html
   */
  onRequestClose?: () => void,
  /**
   * a boolean (default is true) indicate if the modal should restore focus to the element that had focus prior to its display.
   */
  shouldReturnFocusAfterClose?: boolean,
  /**
   * a selector compatible with querySelector. By default, the modal portal will be appended to the document's body. You can choose a different parent element by selector. If you do this, please ensure that your app element is set correctly. The app element should not be a parent of the modal, to prevent modal content from being hidden to screenreaders while it is open.
   */
  reactModalParentSelector?: any,
  /**
   * a React.func. By default, react-command-palette will render the suggestion.name_ for each command. However, if passed a custom react component renderCommand will display the command using any template you can imagine. The renderCommand code signature follows the same coding pattern defined by react-autosuggest's renderSuggestion property.
   */
  renderCommand?: (command: CommandPaletteCommand) => ReactElement<any, any>,
  /**
   * a number between 1 and 500 that determines the maximum number of commands that will be rendered on screen. Defaults to 7
   */
  maxDisplayed?: number,
  /**
   * a string or a React.ComponentType that is displayed when the user selects an item. If a custom spinner is not set then the default spinner will be used. If a custom component or string is provided then it will automatically be wrapped inside a div with a role="status" attribute. If a component is provided then it will be be wrapped in a div that also contains a sibling node with a div contain "Loading..." visible only to screen readers.
   */
  spinner?: string | ComponentType,
  /**
   * a boolean which displays a loading indicator immediately after a command has been selected. When true the spinner is enabled when false the spinner is disabled. Useful when dynamically loading lists of a commands based upon user selections. Setting both showSpinnerOnSelect and closeOnSelect to false will keep the palette open and allow a new list of commands to be loaded, see the dynamic lists example.
   */
  showSpinnerOnSeelct?: boolean,
  /**
   * enables you to apply a sample or custom look-n-feel. Several themes are included with the command palette, Chrome, VS Code and Atom. The CommandPalette comes with the Atom theme enabled default.
   */
  theme?: {
    readonly [key: string]: string
  }
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
        command: (...args) => {
          console.error(args)
          ctx.commands.invoke(c.command)
        }
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
  const commands = open ? getCommands(store.get().context) : []

  const onRequestClose = useCallback(() => setOpen(false), [])

  return <CP
    commands={commands}
    open={open}
    onRequestClose={onRequestClose}
    renderCommand={RenderCommand}
    closeOnSelect={true}
    trigger={null}
    {...props}
  />
}

export default CommandPalette

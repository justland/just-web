# design

`@just-web` is an application framework with strong plugin support.

The plugin architecture is heavily inspired by VSCode extension system.

On top of that, it follows the best practice of clean architecture and component design principles to make sure it is easy to use and easy to extend.

## plugin

### Contributions

The plugin defines its `contributions`.
This contribution info should be available before the plugin is activated.

Think of the "readme" page of VSCode extension.
VSCode gets the plugin's meta data and renders the "readme" page of the extension,
before the extension even installed.

Application can get all `contributions` through `@just-web/contributions`,
meaning the plugin do not need to provide that in runtime.

### Commands

The plugin defines its command contributions, e.g. `just-web.showCommandPalette`.

This command will be the same no matter if the plugin UI is written in `React` or `SolidJS` or any other libraries.

We need to see if there are different kinds of plugins:

`@just-web/react-commands`:

- is this a plugin? Or it is just a component/UI library?
- maybe `@just-web/commands` is the "plugin", while it is a core piece of the application.
- the end application decides to use `@just-web/react-commands` or `@just-web/commands-solid` to handle the `just-web.showCommandPalette`,
- where it controls how the component is rendered specifically.
- For example, the application can handle it by rendering it using `ReactDOM.render()` directly, or
- it can dispatch a redux action which change the state and render the command palette

This means it's the end application job to do `registerCommand('just-web.showCommandPalette', ...)`.
Meaning it is better to named it as `handleCommand(...)`.

So, while optional, it is good to let the app query what contributions are available and which commands are not handled.

Another point is whether if the command can be handled more than one time.
My gut feeling is that it should not be allowed.

The application here means the app or app specific plugins.
i.e. application specific logic

This means there are two kinds of plugins:

- application agnostic plugin
- application specific plugin

Application agnostic plugin should delegate how it is being used to the app or app specific plugins.

## VSCode Extension Architecture

In this section we will talk about how VSCode extension is designed and architected.

### Extension Context vs vscode

```ts
import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand(...)
}
```

- `context` contains contextual information/feature about the extension itself.
- `vscode.*` contains external system (`vscode`) related resources.

## Functional vs Object Oriented

```ts
export const commands = createStore(record())

// vs
export class Commands {
  private commands = createStore(record())
  get(command: string) {
    return this.commands.get()[command]
  }
}
```

Load time initiation = global variable = singleton.

Anyone can access it directly:

```ts
import { commands } from '@just-web/contributions'

commands.reset()
```

Even if we do not expose it directly,
we still need to provide a backdoor to reset it for testing purposes.

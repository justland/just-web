# @just-web/contributions

[@just-web/contributions] manages contribution metadata within a [@just-web] application.

The contribution concept borrows from the [VS Code extension system].

It includes declarative information such as:

- vertical capabilities of the application (e.g. `keyBindings`)
- cross-component capabilities

Other modules will provide the implementation of these capabilities.

For example,

- [@just-web/browser-contributions]: provides features such as `keyBinding`
- [@just-web/react-commands]: provides `<CommandPalette>` component to show, select, and invoke commands and key bindings.

This separates the declaration and implementation into different packages.

It has the benefits of:

- Realize on-demand loading and memory management
- Supporting various platforms and detail implementation without modifying the logic.

## Install

```sh
# npm
npm install @just-web/browser-contributions

# yarn
yarn add @just-web/browser-contributions

# pnpm
pnpm install @just-web/browser-contributions

#rush
rush add -p @just-web/browser-contributions
```

## Usage

```ts
import { createApp } from '@just-web/app'
import contributionsPlugin from '@just-web/contributions'

const app = createApp({ name: 'your-awesome-app' })
  .extend(contributionsPlugin())

await app.start()
```

[@just-web]: https://github.com/justland/just-web
[@just-web/browser-contributions]: https://github.com/justland/just-web/tree/main/plugins/contributions
[@just-web/contributions]: https://github.com/justland/just-web/tree/main/plugins/contributions
[@just-web/react-commands]: https://github.com/justland/just-web/tree/main/components/react-commands
[VS Code extension system]: https://code.visualstudio.com/api

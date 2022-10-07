# @just-web/command-react <!-- omit in toc -->

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/react-commands] provides the components for [@just-web/commands] written in [React].

## Install <!-- omit in toc -->

```sh
# npm
npm install @just-web/react-commands

# yarn
yarn add @just-web/react-commands

# pnpm
pnpm install @just-web/react-commands

#rush
rush add -p @just-web/react-commands
```

## Usage <!-- omit in toc -->

You can load the plugin synchronously or asynchronously.
Here is an example to load it synchronously:

```ts
import { createApp } from '@just-web/app'
import * as reactCommandModule from '@just-web/react-commands'

void (async () => {
  const app = await createApp({ name: 'my-app' })
    .addPlugin(reactCommandModule)
  await app.start()
})()
```

## Features <!-- omit in toc -->

- [CommandPalette](#commandpalette)

## CommandPalette

```tsx
import { CommandPalette } from '@just-web/react-commands'

const Comp = () => <>
  <CommandPalette>
</>
```

[@just-web/commands]: https://github.com/justland/just-web/tree/main/plugins/commands
[@just-web/react-commands]: https://github.com/justland/just-web/tree/main/components/react-commands
[React]: https://reactjs.org/
[downloads-image]: https://img.shields.io/npm/dm/@just-web/react-commands.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/react-commands
[npm-image]: https://img.shields.io/npm/v/@just-web/react-commands.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/react-commands

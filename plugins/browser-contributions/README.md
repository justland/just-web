# `@just-web/browser-contributions`

[`@just-web/browser-contributions`] provides browser specific implementation for [`@just-web/contributions`].

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
import commandsPlugin from '@just-web/commands'
import osPlugin from '@just-web/os'
import browserContributionsPlugin from '@just-web/browser-contributions'

createApp({ name: 'your-awesome-app' })
  .extend(contributionsPlugin())
  .extend(commandsPlugin())
  .extend(osPlugin())
  .extend(browserContributionsPlugin())
```

## To-do

- Listen to key bindings change and add new key bindings

[`@just-web/browser-contributions`]: https://github.com/justland/just-web/tree/main/plugins/browser-contributions
[`@just-web/contributions`]: https://github.com/justland/just-web/tree/main/plugins/contributions

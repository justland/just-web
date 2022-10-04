# @just-web/app

The entry point of `@just-web` application framework.

## Install

```sh
# npm
npm install @just-web/app

# yarn
yarn add @just-web/app

# pnpm
pnpm install @just-web/app

#rush
rush add -p @just-web/app
```

## Basic usage

Using a simple [React] app as an example:

```ts
import { createApp } from '@just-web/app'
import ReactDOM from 'react-dom'
import App from './App'

void (async () => {
  const app = createApp().extend(...)
  await app.start()

  ReactDOM.render(
    <React.StrictMode>
      <App />
    <React.StrictMode>,
    document.getElementById('root')
  )
})
```

[React]: https://reactjs.org/

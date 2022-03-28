# just-web

`@just-web` is a UI library agnostic web application framework.

You can use it to build web application using technology of your choice: `React`, `SolidJS`, `axios`, etc.

This repository is setup as a monorepo containing applications in `@justland` using `@just-web`.

They serve as the direct consumer of `@just-web` and drives the implementation.

- `@just-func/playground-react`: `just-func` playground written with `React`.
- `@just-func/playground-solid`: `just-func` playground written with `SolidJS`.

## Contribute

This repository uses [`rush`](https://rushjs.io/) with [pnpm](https://pnpm.io/).

You need to setup your environment with them to work on this repository.

```sh
# install rush globally
npm install -g @microsoft/rush

# install corepack for Node.js before 14.19.0 and 16.9.0 to use pnpm
npm install -g corepack

# or install pnpm directly
npm install -g pnpm

# enable pnpm with corepack
corepack enable

# setup repository
rush update
```

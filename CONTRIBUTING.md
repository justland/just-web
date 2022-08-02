# Contributing guide

## Prerequisites

This repository uses [`turborepo`](https://turborepo.org/) with [pnpm](https://pnpm.io/).

The best way to get [`pnpm`] is by enabling [`corepack`](https://nodejs.org/api/corepack.html):

```sh
# install corepack for Node.js before 14.19.0 and 16.9.0 to use pnpm
npm install -g corepack

# enable pnpm with corepack
corepack enable

# or install pnpm directly
npm install -g pnpm
```

## Setup

```sh
# setup repository
pnpm install
```

## Folder organization

- apps: Application examples
- components: UI component plugins
- frameworks: minimum required packages needed by any `just-web` application
- libraries: library provides support features for an application
- plugins: non UI plugins
- tools: tools help to build application

## Frequently asked questions

> What is that `2>&1` thing at the end of the script?

It pipes `stderr` to `stdout` so that `rush` can ignore message that send to `stderr` by tools such as `jest`.

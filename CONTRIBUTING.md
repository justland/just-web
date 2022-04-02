# Contributing guide

## Prerequisites

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
```

## Setup

```sh
# setup repository
rush update
```

## Frequently asked questions

> what is that `2>&1` thing at the end of the script?

It pipes `stderr` to `stdout` so that `rush` can ignore message that send to `stderr` by tools such as `jest`.

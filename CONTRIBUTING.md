# Contributing guide

## Frequently asked questions

> what is that `2>&1` thing at the end of the script?

It pipes `stderr` to `stdout` so that `rush` can ignore message that send to `stderr` by tools such as `jest`.

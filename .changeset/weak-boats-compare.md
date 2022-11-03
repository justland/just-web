---
'@just-web/react-commands': patch
---

Internalize the `open` state.
There is no need to use a module (or app) scope store to store this.

Now the command is registered when the command palette first rendered.

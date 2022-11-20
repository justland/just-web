---
'@just-web/commands': major
---

Remove `JustCommand`.

Remove `Command_WithDefault`. Now use the same `Command` type.

`Command` generic type changed to `F` in order to work with function overloads.

`Command.handler` and `Command.defineArgs` are removed.

`connect()` is now the only way to setup the command.

`handlerRegistry.register` is simplified to just take `id`.

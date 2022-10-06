---
"@just-web/types": major
"@just-web/browser": major
"@just-web/browser-keyboard": major
"@just-web/browser-preferences": major
"@just-web/commands": major
"@just-web/events": major
"@just-web/keyboard": major
"@just-web/preferences": major
"@just-web/routes": major
"@just-func/play-react": patch
"@just-web/react-commands": major
---

Replace `@just-web/contributions` with `@just-web/keyboard` and `@just-web/commands`

`contributions.keyBindings` -> `keyboard.keyBindingContributions`
`contributions.commands` -> `commands.contributions`
`commands.register()` -> `commands.handlers.register()`
`commands.invoke()` -> `commands.handlers.invoke()`
`commands.keys()` -> `commands.handlers.keys()`

The contribution is a concept that should spread around plugins,
where which plugin indicates they have contributions to declare.

This makes the dependencies easier to manage.

Fixing [#101](https://github.com/justland/just-web/issues/101)

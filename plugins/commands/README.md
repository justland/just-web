# @just-web/commands

[@just-web/commands] provides mechanism to register and invoke commands.

Commands are basically functions.
There are a few situations to use commands over functions:

- Tracking: execution of commands are tracked. They are logged at `logLevels.trace`.
- Polymorphic: command can be defined by a higher-level module, and implement by a lower-level detail module. Allows you to handle the same command differently depending on the environment and condition.
- Menu, Command Palette, Keyboard shortcuts: along with [@just-web/keyboard], commands can be displayed and invoked in different ways.
- Cross-boundary: command can be invoked by different modules, without directly depends on the defining module (*1)
- Dynamic dispatch: command type is a string, meaning you can dynamically construct it and invoke the command. This is useful for free from or user-based input.

*1: while this is possible,
you do lose the ability of using the helper functions (if provided by the defining module).
You will need to invoke the command by the command name directly,
and implicitly know the signature of the command.
This is a classic case of strongly type limitation.

## Install

```sh
# npm
npm install @just-web/commands

# yarn
yarn add @just-web/commands

# pnpm
pnpm install @just-web/commands

#rush
rush add -p @just-web/commands
```

[@just-web/commands]: https://github.com/justland/just-web/tree/main/frameworks/commands
[@just-web/keyboard]: https://github.com/justland/just-web/tree/main/frameworks/keyboard

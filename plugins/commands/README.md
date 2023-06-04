# @just-web/commands

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/commands] provides mechanism to register and invoke commands.

Commands are basically functions.
There are a few situations to use commands over functions:

- Type-safe: the signature of the command is defined when the command is created. This means they are more similar to signals then events.
- Polymorphic: command can be defined by a higher-level module, and implement by a lower-level detail module. Allows you to handle the same command differently depending on the environment and condition.
- Menu, Command Palette, Keyboard shortcuts: along with [@just-web/keyboard], commands can be displayed and invoked in different ways.
- Cross-boundary: command can be invoked by different modules, without directly depends on the defining module (*1)
- Tracking: execution of commands are tracked. They are logged at `logLevels.trace`.
- Dynamic dispatch: command type is a string, meaning you can dynamically construct it and invoke the command. This is useful for free from or user-based input. The command provides helper functions.

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

## command

To create a command, you use the [`command()`] function.

The basic way to use it is passing in an `id` and a `handler`:

```ts
const singCommand = command('party.sing', (songName: string) => sing(songName))

singCommand('Dancing Queen')
```

You can also separate the declaration of the command and the implementation by specifying the type and omit the `handler`:

```ts
const singCommand = command<(name: string) => void>('party.sing')

// in another file or package
singCommand.defaultHandler((name) => sing(name))
```

However, its true power is when you use it with [@just-web].

```ts
import { define } from '@just-web/app'
import { command, type CommandsGizmo } from '@just-web/commands'
import { type KeyboardGizmo } from '@just-web/keyboard'
import { extractFunction } from 'type-plus'

export const singCommand = command<(songName: string) => void>('party.sing')
export const danceCommand = command({
    id: 'party.dance',
    description: `World's End Dancehall`,
    key: 'ctrl+d'
  },
  (danceNumber: string) => dance(danceNumber)
)

const partyPlugin = define({
  static: define.require<CommandsGizmo>().optional<KeyboardGizmo>(),
  async create(ctx) {
    singCommand.connect(ctx, (songName) => sing(songName))
    danceCommand.connect(ctx)

    return {
      party: {
        sing(songName: string) {
          singCommand(songName)
        },
        // yes, this will work, since the command is connected.
        // the `extractFunction()` extracts the function signature from the command.
        dance: extractFunction(danceCommand)
      }
    }
  }
})
```

In the example above, you can see that the [`command()`] function also accepts an `info` object,
which includes additional information about the command,
including key bindings.

Then within the `gizmo`, you can connect the command to an application by calling the `connect()` function.

This enables the tracking, key bindings, and command palette support for the command.

You can also expose the command within the `gizmo` by wrapping (as in the `sing()` example),
or by using the `extractFunction()` function from [type-plus].

[@just-web]: https://github.com/justland/just-web
[@just-web/commands]: https://github.com/justland/just-web/tree/main/frameworks/commands
[@just-web/keyboard]: https://github.com/justland/just-web/tree/main/frameworks/keyboard
[`command()`]: https://github.com/justland/just-web/tree/main/frameworks/commands/ts/command.ts
[downloads-image]: https://img.shields.io/npm/dm/@just-web/commands.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/commands
[npm-image]: https://img.shields.io/npm/v/@just-web/commands.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/commands
[type-plus]: https://github.com/unional/type-plus

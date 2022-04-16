# @just-web/contributions

[`@just-web/contributions`] manages contribution metadata within a `@just-web` application.

This is a core module of `@just-web`.
You do not need to reference this module directly.

This contribution concept borrows from the [VS Code extension system].
It includes declarative information such as:

- vertical capabilities of the application (e.g. `keyBindings`)
- cross-component capabilities

Each module (core module or plugin) provides the implementation of these capabilities.

The key benefit of separating the contribution declaration and implementation is realizing on-demand loading and memory management.

The implementation is loaded (lazy load or delay load) only when the implementation is needed.

Currently, the declarations are made within the code, defeating the lazy loading purpose.
This will be addressed in the future when the plugin structure is more flushed out and tooling are in place.

[`@just-web/contributions`]: https://github.com/justland/just-web/tree/main/frameworks/contributions
[VS Code extension system]: https://code.visualstudio.com/api

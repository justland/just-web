# @just-web/contributions

`@just-web` contribution stores.

The "contribution" concept borrows the term from vscode.

It contains declarative information about the capabilities of the application.

Each module (core module or plugins) provides the implementation of these capabilities.

The key benefit of separating the contribution declaration and implementation is realizing on-demand loading and memory management.

The implementation is loaded (lazy load or delay load) only when the implementation is needed.

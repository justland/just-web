# About activation events

VSCode activation events are used to indicate when the extension should be activated.

It sounds a bit redundant as any contribution should likely be an activation event.

There might be specific use cases for it.

For `@just-web`, the activation event can be used to determine when a dynamic plugin will be loaded.

Since the separation can occur at the boundary (i.e. one logic/app component + one UI component),
we need to know which plugin will handle the event (e.g. invoke a command and looking for the handler).

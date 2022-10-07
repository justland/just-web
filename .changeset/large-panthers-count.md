---
"@just-web/events": patch
---

Improve types.

The event emitter type is now inferred based on `options.emitter` or default to `eventemitter3`.

Fixed the `EventsContext` and provides the `EventsOptions` type.

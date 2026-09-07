---
"@just-web/events": major
---

Adopt `@unional/events-plus@4`.

`@unional/events-plus@4.0.0` widens its `@just-func/types` dependency from `^0.5.1` to `^0.6.0` so it resolves `type-plus@8.0.0-beta.10` instead of a caret-locked `type-plus@5.6.0`. It takes `major` because the `JustDuo`, `JustEmpty`, `JustMeta` and `JustUno` types leak into its emitted `.d.ts` — and `@just-web/events`'s `justEvent` module re-exports the same `JustEventDuo`, `JustEventEmpty` and `JustEventUno` types verbatim, so the same reasoning applies here.

Migration:

- No API shape changed. If you import `JustEventDuo`, `JustEventEmpty` or `JustEventUno` from `@just-web/events`, no change is required beyond re-installing — the type identities now resolve through `@just-func/types@0.6.0` / `type-plus@8.0.0-beta.10` instead of the previous stale `type-plus@5.6.0`.

---
'@just-web/id': patch
---

Pin the `type-plus` `devDependency` to the exact version `8.0.0-beta.10`.

`type-plus` is a development-only dependency here and does not appear in the emitted `.d.ts`, so @just-web/id@7.3.3 consumers neither resolve it nor inherit its `typescript >= 5.6.0` peer. Nothing about the published package changes; this keeps the repo on one `type-plus` version.

Why an exact pin rather than a caret range: `^8.0.0-beta.10` would resolve to `>=8.0.0-beta.10 <9.0.0-0`, which admits every later `8.0.0` prerelease plus `8.0.0` and `8.1.0`. 8 is a prerelease line where breaking changes land between betas — `beta.10` -> `beta.11` changed `Equal`'s signature and removed `isType.f`. An exact version makes each bump a reviewable PR instead of something a lockfile refresh can do silently.

This release is also what lets `justland/just-web-react` and `justland/just-web-foundation` drop several stale transitive copies of `type-plus`: they currently resolve extra majors purely because the published `@just-web/*` packages carried an older one.

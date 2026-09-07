---
'@just-web/presets-browser': major
---

Pin `type-plus` to the exact version `8.0.0-beta.10`.

`type-plus` is only a `devDependency` here, but the emitted `.d.ts` still references it as an external module (`import("type-plus").JSONTypes` and friends), so consumers of @just-web/presets-browser@8.0.4 do resolve `type-plus` and do inherit its `peerDependencies: { typescript: '>= 5.6.0' }` — a peer that `type-plus` 5, 6 and 7 did not declare. The referenced types also change shape between prereleases (`Equal` now takes an options object, `isType.f` and `NonUndefined` are gone, several `$`-prefixed symbols renamed), so this is major for consumers.

That external reference from a devDependency is a pre-existing phantom dependency and is not introduced or fixed here; it is only the reason this bump is major rather than patch.

Why an exact pin rather than a caret range: `^8.0.0-beta.10` would resolve to `>=8.0.0-beta.10 <9.0.0-0`, which admits every later `8.0.0` prerelease plus `8.0.0` and `8.1.0`. 8 is a prerelease line where breaking changes land between betas — `beta.10` -> `beta.11` changed `Equal`'s signature and removed `isType.f`. An exact version makes each bump a reviewable PR instead of something a lockfile refresh can do silently.

This release is also what lets `justland/just-web-react` and `justland/just-web-foundation` drop several stale transitive copies of `type-plus`: they currently resolve extra majors purely because the published `@just-web/*` packages carried an older one.

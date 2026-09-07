---
'@just-web/keyboard': major
---

Pin `type-plus` to the exact version `8.0.0-beta.10` in `dependencies`.

@just-web/keyboard@7.4.0 depends on `type-plus@8.0.0-beta.8`. This moves that runtime dependency to `8.0.0-beta.10`, which is a breaking change between prereleases: `Equal` takes an options object instead of positional `Then`/`Else`, `isType.f` is gone, `NonUndefined` was removed, and several `$`-prefixed symbols were renamed.

Because `type-plus` stays a runtime dependency, consumers resolve it themselves and inherit its `peerDependencies: { typescript: '>= 5.6.0' }`. That peer did not exist on `type-plus` 5, 6 or 7, so this is major for consumers even though nothing in this package's own source changed.

`8.0.0-beta.8` declared `"type": "module"` and shipped CommonJS under `cjs/` with no `{"type":"commonjs"}` marker, which made `require()` of these packages throw `exports is not defined in ES module scope`. `8.0.0-beta.10` ships that marker, so the revert to `^7.6.2` that this supersedes is no longer needed.

Why an exact pin rather than a caret range: `^8.0.0-beta.10` would resolve to `>=8.0.0-beta.10 <9.0.0-0`, which admits every later `8.0.0` prerelease plus `8.0.0` and `8.1.0`. 8 is a prerelease line where breaking changes land between betas — `beta.10` -> `beta.11` changed `Equal`'s signature and removed `isType.f`. An exact version makes each bump a reviewable PR instead of something a lockfile refresh can do silently.

This release is also what lets `justland/just-web-react` and `justland/just-web-foundation` drop several stale transitive copies of `type-plus`: they currently resolve extra majors purely because the published `@just-web/*` packages carried an older one.

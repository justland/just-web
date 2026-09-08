---
'@just-web/browser-preferences': patch
'@just-web/browser-keyboard': patch
'@just-web/repo-scripts': patch
'@just-web/preferences': patch
'@just-web/commands': patch
'@just-web/keyboard': patch
'@just-web/browser': patch
'@just-web/events': patch
'@just-web/routes': patch
'@just-web/states': patch
'@just-web/app': patch
'@just-web/log': patch
'@just-web/id': patch
'@just-web/os': patch
---

Move `type-plus` onto the 8.x beta and collapse `tersify` to a single major

`tersify` now resolves at `4.0.6` only. It had been resolving at two majors:
`3.12.1` arrived underneath `type-plus` 5.x and 7.x, which depend on
`tersify ^3`, while this repo asked for 4 directly. Through `standard-log` in
`@just-web/log`'s runtime dependencies, that reached published consumers.

Fixing it here was not possible -- every package still holding `type-plus` 5 or
7 was upstream. Those have now shipped on `type-plus` 8, and this change simply
consumes them: `standard-log` 13.3.0, `@unional/events-plus` 4.0.0,
`repobuddy` 1.6.0 and `@repobuddy/typescript` 2.2.0 (both of which reach
`clibuilder` 11), plus `assertron` 11.7.0 and `iso-error` 7.0.0 in the dev tree.
A pnpm override would have collapsed this months of work earlier; it was
declined deliberately in favour of the upstream fix.

`type-plus` is an EXACT pin on `8.0.0-beta.10`, not a caret. This reverses part
of `stop shipping the type-plus prerelease to consumers`, deliberately and for a
specific reason: every upstream package now pins that exact version, so a caret
here would resolve to `8.0.0-beta.11` and put TWO copies of `type-plus` in the
tree. Matching the pin is what produces one. The Dependabot block on
`>=8.0.0-0` is replaced by one on `>=9.0.0-0`, so a new major still cannot
arrive unattended.

The rest of the dependency set moves to latest: `@unional/gizmo` 2.3.5 (the
lockfile refresh an earlier change deferred as too fresh to soak), `tersify`
4.0.6, and for `@just-web/repo-scripts` the shared build toolchain, `tsdown`
0.23.0 and `typescript` 7.0.2.

`vitest` is deliberately held at 4.1.11. `@repobuddy/vitest`, the catalog preset
every package uses, still declares a `vitest ^4` peer at its own latest, so
moving the root to 5 would leave it inert while the packages ran 4. The catalog
entry moves 2.1.1 -> 2.1.4 instead; `ncu` cannot see it, since it lives in
`pnpm-workspace.yaml`.

Verification, rather than assumption: `pnpm verify` is green across all 62 tasks
-- build, types, lint, knip, size and coverage -- on TypeScript 7.0.2, and that
includes the `@unional/events-plus` 3 -> 4 major in `@just-web/events`. tsdown
reports TypeScript 7's API as experimental, so declaration emit is worth
watching.

One temporary thing rides along, and it must not be forgotten. Every upstream
release landed on 2026-09-07 and is still inside this repo's 1440-minute
`minimumReleaseAge` window, so the soak correctly refused all of them. Rather
than weaken `minimumReleaseAgeStrict`, seven packages are exempted BY NAME in
`minimumReleaseAgeExclude`. The last of them matures 2026-09-08T08:40Z. A revert
PR removing that block is open and should be merged once it does.

---
'@just-web/repo-scripts': patch
---

Collapse `tersify` to a single major

`tersify` now resolves at `4.0.6` only. `3.12.1` had still been arriving
underneath `type-plus` 5.x and 7.x, which depend on `tersify ^3`, while this
repo asked for 4 directly.

`adopt first-party majors` moved most of the tree onto `type-plus` 8, but three
holdouts remained in the lockfile: `clibuilder` 9.2.0 and 10.1.0, and
`standard-log` 12.1.2. All three arrived through `repobuddy` and
`@repobuddy/typescript`, which were still pinned below the releases that adopt
`clibuilder` 11. Moving `repobuddy` to `^1.6.0` and `@repobuddy/typescript` to
`^2.2.0` clears the last of them, and with them the final `tersify` 3.

Two smaller things ride along:

`repobuddy` is added to `minimumReleaseAgeExclude`. The existing
`'@repobuddy/*'` glob covers the scoped packages but not this one, which is
unscoped and first-party all the same.

The Dependabot `ignore` for `type-plus` moves from `>=8.0.0-0` to `>=9.0.0-0`.
The 8.x block dated from when this repo deliberately stayed on 7.x; now that
every package pins `8.0.0-beta.10`, that rule blocked the line the repo actually
tracks. A new major still cannot arrive unattended.

The `@repobuddy/vitest` catalog entry moves `^2.1.1` to `^2.1.4`. `ncu` cannot
see it, since it lives in `pnpm-workspace.yaml` rather than a manifest.

Verification: `tersify` and `type-plus` were read back out of the lockfile
rather than inferred -- one `tersify@4.0.6`, one `type-plus@8.0.0-beta.10`.

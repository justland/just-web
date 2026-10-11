---
"@just-web/browser-i18n": major
---

Drop the CommonJS build. The package now ships ESM only, following `type-plus` 8.

Removed: the `cjs/` folder, the `require` export condition, and `main`.
`engines.node` is now `^20.19.0 || >=22.12.0`.

The `@just-web/browser-i18n/testing` export is also gone. It pointed at a file the package never shipped.

Migration:

- ESM code and bundlers need no change.
- CommonJS code on Node 20.19+ or 22.12+ can still `require("@just-web/browser-i18n")`: Node loads ES modules through `require()` without a flag.
- On older Node, upgrade Node or load the package with `await import("@just-web/browser-i18n")`.
- TypeScript projects on `moduleResolution: "node"` (node10) must move to `node16`, `nodenext` or `bundler` to resolve subpaths such as `/testing`.

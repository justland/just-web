---
"@just-web/browser-i18n": major
"@just-web/browser-keyboard": major
"@just-web/browser-preferences": major
"@just-web/i18n": major
"@just-web/presets-browser": major
---

Remove `peerDependenciesMeta` entries that marked peer dependencies as optional. Peer dependencies are now required.

Affected peer dependencies:
- `@just-web/commands` (in `@just-web/browser-i18n` and `@just-web/i18n`)
- `@just-web/keyboard` (in all affected packages)

Ensure these peer dependencies are installed when using these packages.

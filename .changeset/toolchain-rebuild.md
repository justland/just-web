---
'@just-web/app': patch
'@just-web/browser': patch
'@just-web/browser-i18n': patch
'@just-web/browser-keyboard': patch
'@just-web/browser-preferences': patch
'@just-web/commands': patch
'@just-web/events': patch
'@just-web/fetch': patch
'@just-web/formatjs': patch
'@just-web/history': patch
'@just-web/i18n': patch
'@just-web/id': patch
'@just-web/keyboard': patch
'@just-web/log': patch
'@just-web/os': patch
'@just-web/preferences': patch
'@just-web/presets-browser': patch
'@just-web/repo-scripts': patch
'@just-web/routes': patch
'@just-web/states': patch
---

Rebuild with tsdown 0.22 and the refreshed toolchain.

No public API changes. The emitted `esm/`, `cjs/` and `.d.ts` output differs from the previous release (formatting, and declaration files now use inline `import("...")` types rather than a hoisted namespace import), so this ships as a patch.

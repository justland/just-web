---
'@just-web/app': patch
'@just-web/browser': patch
'@just-web/browser-keyboard': patch
'@just-web/browser-preferences': patch
'@just-web/commands': patch
'@just-web/keyboard': patch
'@just-web/log': patch
'@just-web/os': patch
'@just-web/routes': patch
'@just-web/states': patch
---

Depend on the stable `type-plus` line (`^7.6.2`) instead of pinning the `8.0.0-beta.8` prerelease.

These ten packages declared `type-plus` as an exact prerelease pin in `dependencies`, so every consumer installing them was pulled onto a prerelease, and a project using two of them could resolve two copies. `type-plus@latest` is 7.6.2 and stays on 7.x deliberately.

The prerelease is also why `require()` of these packages threw `exports is not defined in ES module scope`: `8.0.0-beta.8` declares `"type": "module"` and ships CommonJS under `cjs/` with no `{"type":"commonjs"}` marker. 7.6.2 ships that marker.

Emitted output is unchanged apart from the bundled dependency itself, so this is a patch.

---
'@just-web/app': patch
'@just-web/log': patch
'@just-web/types': patch
'@just-web/states': patch
'@just-web/browser': patch
'@just-web/browser-keyboard': patch
'@just-web/browser-preferences': patch
'@just-web/commands': patch
'@just-web/events': patch
'@just-web/keyboard': patch
'@just-web/os': patch
'@just-web/preferences': patch
'@just-web/routes': patch
'@just-web/presets-browser': patch
'@just-web/testing': patch
---

Fix `exports` fields.
`types` should go first,
`default` should go last, and point to CJS code.

Also added `main` and `module` to improve compatibility.

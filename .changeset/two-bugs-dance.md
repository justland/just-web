---
"@just-web/react": patch
"@just-web/app": patch
---

`@just-web/app`: starts newly added plugin when calling `start()` again.
`@just-web/react`: fix `lazyImport()` to start the plugin correctly.

The signature of `lazyImport()` changed.
But since this is so new, keep it as a patch.

---
'@just-web/events': patch
---

Bump the `assertron` `devDependency` to `^11.6.0`.

`assertron@11.6.0` is the first release built against `type-plus` 8; the previous `^11.5.3` range kept resolving `11.5.2`/`11.5.3`, which pull `type-plus` 7 and `tersify` 3 into the tree alongside the version the rest of the repo uses. Development-only, so nothing about the published package changes.

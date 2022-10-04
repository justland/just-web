---
"@just-web/os": major
---

Add `@just-web/os` for OS specific capabilities.

It is extracted from `@just-web/platform` (removed).

Note that it is a plugin and add the feature to the app itself,
along with exposing the functionalities as named exports.

This is because the having and use them through app allows mocks to be injected deep in the system,
very useful when rendering OS dependent UI in storybook.

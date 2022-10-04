# @just-web/os

## 1.1.1

### Patch Changes

- @just-web/log@1.1.1
- @just-web/types@1.1.1

## 1.1.0

### Patch Changes

- @just-web/log@1.1.0
- @just-web/types@1.1.0

## 1.0.2

### Patch Changes

- @just-web/log@1.0.2
- @just-web/types@1.0.2

## 1.0.1

### Patch Changes

- @just-web/log@1.0.1
- @just-web/types@1.0.1

## 1.0.0

### Major Changes

- 8c3183e: Add `@just-web/os` for OS specific capabilities.

  It is extracted from `@just-web/platform` (removed).

  Note that it is a plugin and add the feature to the app itself,
  along with exposing the functionalities as named exports.

  This is because the having and use them through app allows mocks to be injected deep in the system,
  very useful when rendering OS dependent UI in storybook.

### Patch Changes

- Updated dependencies [564addf]
- Updated dependencies [c228a89]
- Updated dependencies [8c3183e]
  - @just-web/log@1.0.0
  - @just-web/types@1.0.0

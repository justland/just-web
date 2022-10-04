# @just-web/preferences

## 1.0.0

### Major Changes

- 8c3183e: Add `@just-web/preferences` and `@just-web/browser-preferences` for managing user preference.

  `@just-web/browser-preferences` use `localStorage` for the job.
  Meaning the preference will be preserved through tabs and sessions.

  The key are prefixed with app name so that it works correctly in micro app/micro frontend scenarios.
  The same for `clearAll()`. It only clears those belong to the application.

### Patch Changes

- Updated dependencies [b262ab5]
- Updated dependencies [564addf]
- Updated dependencies [c228a89]
- Updated dependencies [8c3183e]
  - @just-web/commands@1.0.0
  - @just-web/contributions@1.0.0
  - @just-web/log@1.0.0
  - @just-web/types@1.0.0

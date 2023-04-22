# @just-web/presets-browser

## 5.0.0-beta.3

### Patch Changes

- Updated dependencies [18455d27]
  - @just-web/app@7.0.0-beta.3
  - @just-web/browser@7.0.0-beta.3
  - @just-web/browser-preferences@7.0.0-beta.3
  - @just-web/commands@7.0.0-beta.3
  - @just-web/history@2.0.0-beta.3
  - @just-web/keyboard@7.0.0-beta.3

## 5.0.0-beta.2

### Patch Changes

- Updated dependencies [78becd0d]
  - @just-web/app@7.0.0-beta.2
  - @just-web/browser@7.0.0-beta.2
  - @just-web/browser-preferences@7.0.0-beta.2
  - @just-web/commands@7.0.0-beta.2
  - @just-web/history@2.0.0-beta.2
  - @just-web/keyboard@7.0.0-beta.2

## 5.0.0-beta.1

### Patch Changes

- Updated dependencies [ab9f056d]
  - @just-web/app@7.0.0-beta.1
  - @just-web/browser@7.0.0-beta.1
  - @just-web/browser-preferences@7.0.0-beta.1
  - @just-web/commands@7.0.0-beta.1
  - @just-web/history@2.0.0-beta.1
  - @just-web/keyboard@7.0.0-beta.1

## 5.0.0-beta.0

### Patch Changes

- Updated dependencies [f9aaffe2]
- Updated dependencies [3c0c09c2]
  - @just-web/browser@7.0.0-beta.0
  - @just-web/commands@7.0.0-beta.0
  - @just-web/browser-preferences@7.0.0-beta.0
  - @just-web/keyboard@7.0.0-beta.0
  - @just-web/app@7.0.0-beta.0
  - @just-web/history@2.0.0-beta.0

## 4.0.2

### Patch Changes

- Updated dependencies [a15cdc1a]
- Updated dependencies [42eada47]
  - @just-web/browser-preferences@6.0.2
  - @just-web/browser@6.0.2
  - @just-web/commands@6.0.2
  - @just-web/keyboard@6.0.2
  - @just-web/history@1.0.1

## 4.0.1

### Patch Changes

- c1083a8c: Adjust homepage link

## 4.0.0

### Major Changes

- e09c4ebd: Use `@just-web/history`.

  The options now pass in an history object of your choice,
  instead of fixing to a browser history.

### Patch Changes

- Updated dependencies [eb559fd0]
- Updated dependencies [117ced4c]
  - @just-web/browser@6.0.1
  - @just-web/history@1.0.0
  - @just-web/browser-preferences@6.0.1
  - @just-web/commands@6.0.1
  - @just-web/keyboard@6.0.1

## 3.0.1

### Patch Changes

- 3146ecd2: fix export default

## 3.0.0

### Patch Changes

- 2122d01a: Update `type-plus`
- 43fadc75: Fix `exports` fields.
  `types` should go first,
  `default` should go last, and point to CJS code.

  Also added `main` and `module` to improve compatibility.

- Updated dependencies [2122d01a]
- Updated dependencies [43fadc75]
  - @just-web/browser@6.0.0
  - @just-web/browser-preferences@6.0.0
  - @just-web/commands@6.0.0
  - @just-web/keyboard@6.0.0

## 2.0.4

### Patch Changes

- @just-web/browser@5.0.4
- @just-web/browser-preferences@5.0.4
- @just-web/commands@5.0.4
- @just-web/keyboard@5.0.4

## 2.0.3

### Patch Changes

- Updated dependencies [3a4f7414]
- Updated dependencies [11e57e0e]
  - @just-web/commands@5.0.3
  - @just-web/browser-preferences@5.0.3
  - @just-web/browser@5.0.3
  - @just-web/keyboard@5.0.3

## 2.0.2

### Patch Changes

- @just-web/keyboard@5.0.2
- @just-web/browser-preferences@5.0.2
- @just-web/commands@5.0.2
- @just-web/browser@5.0.2

## 2.0.1

### Patch Changes

- Updated dependencies [17e3bd65]
  - @just-web/browser@5.0.1
  - @just-web/browser-preferences@5.0.1
  - @just-web/commands@5.0.1
  - @just-web/keyboard@5.0.1

## 2.0.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- 74329e86: Remove usage of `StartContext`.
  `@just-web/presets-browser`: Export additional types.
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
- Updated dependencies [d3db351f]
- Updated dependencies [74329e86]
  - @just-web/browser@5.0.0
  - @just-web/browser-preferences@5.0.0
  - @just-web/commands@5.0.0
  - @just-web/keyboard@5.0.0

## 2.0.0-beta.0

### Minor Changes

- 12576b56: Add ESM support

### Patch Changes

- d3db351f: Update `type-plus`
- 74329e86: Remove usage of `StartContext`.
  `@just-web/presets-browser`: Export additional types.
- Updated dependencies [d3db351f]
- Updated dependencies [12576b56]
- Updated dependencies [d3db351f]
- Updated dependencies [74329e86]
  - @just-web/browser@5.0.0-beta.0
  - @just-web/browser-preferences@5.0.0-beta.0
  - @just-web/commands@5.0.0-beta.0
  - @just-web/keyboard@5.0.0-beta.0

## 1.0.3

### Patch Changes

- @just-web/browser@4.1.0
- @just-web/browser-preferences@4.1.0

## 1.0.2

### Patch Changes

- ce2f955a: re-export types to workaround "cannot be named" error.

## 1.0.1

### Patch Changes

- Add missing files to package

## 1.0.0

### Major Changes

- 54f12bec: Initial release.

  `@just-web/presets-browser` provides common browser features using specific set of libraries.

  This presets includes:

  - [@just-web/browser](https://www.npmjs.com/package/@just-web/browser)
  - [@just-web/browser-preferences](https://www.npmjs.com/package/@just-web/browser-preferences)
  - [history](https://www.npmjs.com/package/history)

### Patch Changes

- Updated dependencies [54f12bec]
  - @just-web/browser-preferences@4.0.2
  - @just-web/browser@4.0.2

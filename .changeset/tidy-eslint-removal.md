---
'@just-web/repo-scripts': minor
---

Remove the dead `config/eslint.js`, `config/.eslintrc.react.js` and `config/babel.config.js` exports, along with the eslint dependencies they pulled in.

The repository lints with biome, and these configs were unusable as shipped: they are `.eslintrc`-format objects that the declared eslint 9 cannot consume, and the babel config referenced `@babel/*` presets that were never dependencies. Consumers importing `@just-web/repo-scripts/config/eslint.js` should move to `@repobuddy/biome`.

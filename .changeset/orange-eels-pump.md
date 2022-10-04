---
"@just-web/react-commands": patch
---

Update `react-command-palette` to `0.21.1`.

The "Using UNSAFE_componentWillReceiveProps in strict mode" is not fixed.

That is caused by https://github.com/moroshko/react-autosuggest/issues/624
and likely will not be fixed.

Will soon need to look for alternatives.

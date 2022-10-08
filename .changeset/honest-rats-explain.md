---
"@just-web/commands": major
---

Add support to declare `command()` with contributions.

```ts
command({
  id: 'plugin-a.increment',
  name: 'Increment',
  description: 'Increment input value by 1',
  key: 'ctrl+k'
})
```

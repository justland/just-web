---
'@just-web/app': patch
---

Expose `GizmoIncubator`.

Exposing the needed type one by one to identify the behavior causing:

```txt
The inferred type of 'app1' cannot be named without a reference to '.../node_modules/@unional/gizmo'. This is likely not portable. A type annotation is necessary
```

This release test if exposing just on `index` side is enough to fix the issue also for `testing`.

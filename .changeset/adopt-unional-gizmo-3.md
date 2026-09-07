---
"@just-web/log": minor
"@just-web/app": minor
"@just-web/id": minor
---

Adopt `@unional/gizmo@3`, removing a stale transitive `type-plus` copy from consumers' trees.

`@unional/gizmo@3.0.0` pins `type-plus` to `8.0.0-beta.10` exactly and raises its Node engine floor to `>= 20` (it carries `type-plus` as a runtime dependency and re-exports its types). Gizmo's own public API (`define`, `incubate`, `Gizmo`, `GizmoBase`, `DepBuilder`, etc.) is unchanged, and none of `@just-web/log`, `@just-web/id` or `@just-web/app` declare their own `engines.node`, so the floor raise narrows nothing they declare.

---
'@just-web/commands': major
---

Workaround `Partial<T>` issue with `exactOptionalPropertyType`.

<https://github.com/microsoft/TypeScript/issues/46969#issuecomment-1528886328>

This `Partial<T>` will be added to `type-plus`,
but since `type-plus` is currently making some changes and will take a few more days to complete,
the type is added here as a workaround.

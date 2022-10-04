---
"@just-web/commands": patch
---

Commands can be added irrespective of contributions.

This means contributions are now public contributions,
and we can register commands that are internal to the application.

This is the same model as VS Code.

Originally I want all commands to be public,
so that we can access every command everywhere.

But there are use cases that commands can be used within a subsection of an application.
For example, some UI internal commands for interactions.

In those cases, it doesn't make sense to make those command public.


`invoke()` now returns the value returned from the handler.
It is not typed at the moment.

Will need to revisit it to figure out how to type the command's return type.

May need to create a replacement of the `JustEvent` from `@unional/events-plus`.

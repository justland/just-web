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

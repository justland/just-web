# @just-web/format

[`@just-web/format`] provides API to format values before passing them to external systems.

It is used internally for things such as:

- Various sanitization: string, URL, filename, HTML, query, XML, etc.
- Localization
- Render formatting: sentence case, title case, etc.

It utilizes the plugin system so that applications can replace the formatting with different implementation to suit their needs.

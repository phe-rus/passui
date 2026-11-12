---

title: "@passui/tanstack"
summary: Optional form, table, router and query integrations built on Passui's components.
section: libraries
order: 12
---

Passui works without TanStack. Add this package when you want forms, tables, routing helpers and mutations already wired to Passui controls.

```bash
bunx @passui/cli@latest init --integration tanstack
```

Or by hand, with the peers you use:

```bash
bun add @passui/tanstack @tanstack/react-query
```

`@passui/react` and `@passui/icons` are peers of this package.

## Styles

```css
@import "@passui/tanstack/globals.css";
```

This imports Tailwind, the Passui theme and the styles for the integrations in one line.

## Entry points

| Import                            | What it gives you                                       |
| --------------------------------- | ------------------------------------------------------- |
| `@passui/tanstack/forms`          | Form setup on TanStack Form                             |
| `@passui/tanstack/form-fields`    | Passui inputs bound to form state, such as `FieldInput` |
| `@passui/tanstack/tables`         | Tables on TanStack Table                                |
| `@passui/tanstack/mutation`       | Mutations with optimistic updates                       |
| `@passui/tanstack/route-boundary` | Error and not found boundaries for routes               |
| `@passui/tanstack/auth-shell`     | A sign in shell                                         |
| `@passui/tanstack/settings`       | Settings lists                                          |
| `@passui/tanstack/document`       | The document shell, with devtools                       |
| `@passui/tanstack/core`           | Framework independent helpers                           |

The `/react/<name>` paths are the same modules under an explicit React prefix. Framework libraries are optional peers: install the adapters you import.

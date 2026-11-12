---

title: API reference
summary: How the API is laid out, where each package's entry points are, and where props are documented.
section: namespace
order: 30
---

## Per component

Every page under Components ends with an **API reference**: each part, its props, types and defaults. They are read from the built type declarations and JSDoc, so they match the code you install.

## Entry points

| Package            | Entry points                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| `@passui/react`    | One subpath per component, such as `@passui/react/dialog`, plus `/appearance`, `/cn` and the hooks |
| `@passui/icons`    | One subpath per icon, such as `@passui/icons/home`                                                 |
| `@passui/tokens`   | `/accent`, `/color`, `/layout`, `/motion`, `/typography` and the stylesheets                       |
| `@passui/tanstack` | `/forms`, `/form-fields`, `/tables`, `/mutation`, `/route-boundary` and more                       |
| `@passui/cli`      | The `passui` command                                                                               |

## Conventions

- **Names** follow shadcn: `Dialog`, `DialogContent`, `DialogTitle`.
- **Composition**: triggers take a `render` prop to become your own element.
- **State** is exposed as data attributes: `data-state`, `data-variant`, `data-size`.
- **Sizes** use one scale: `xs`, `sm`, default and `lg`.

## For tools

[`/llms.txt`](/llms.txt) indexes every page, and the [skill](/skills/passui/SKILL.md) gives an agent the rules above in one file.

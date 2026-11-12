---

title: Introduction
summary: What Passui is, what it is made of, and the ideas behind it.
section: sections
order: 1
---

## What Passui is

Passui is a small, native React control library with an Apple 2026 look. Every component is plain readable code, built on a headless Zag.js state machine where behaviour is hard, and on a native element where it is not.

You pay only for what you import. `Button` is under 2 KB gzip; an overlay such as a Dialog costs about 20 KB because it carries focus handling, dismissal and positioning for you.

## Packages

- `@passui/react`: the components, one subpath each.
- `@passui/icons`: redrawn mono and duo icons, one subpath each.
- `@passui/tokens`: colours, type scale, motion and the shared stylesheet.
- `@passui/tanstack`: optional form, table and router integrations.
- `@passui/cli`: project setup.

## Ideas

Names follow shadcn (`Dialog`, `DialogContent`), so nothing needs translating. Triggers take a `render` prop to become your own element. State is styled through data attributes, and a panel reversed halfway continues from where it is.

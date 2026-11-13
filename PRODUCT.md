# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

React app developers who want native-feeling, Apple-style controls they can read and own as code. Pherus apps (Notables, Pass, Accounts) are the first consumers; outside teams adopt Passui through npm and the CLI. Work happens in a code editor and the docs site (passui.pherus.org): finding a component, previewing it, copying its source.

## Product Purpose

Passui is a framework independent UI kit for React: native controls, shared design tokens, optional TanStack integration (form, table, router, query) and a setup CLI. It exists so apps get one coherent, Apple-inspired design language without depending on third-party primitive libraries. Success: a developer installs one stylesheet and imports public component entry points, and the result feels native on every platform.

## Positioning

A design language for the web in the spirit of SwiftUI and Liquid Glass, with controls written in-house. Passui does not use @base-ui/react or shadcn primitives at runtime; it borrows their readable composition and accessibility conventions only. Names follow shadcn, falling back to SwiftUI names where shadcn has none.

## Operating Context

Bun workspace monorepo (`packages/tokens`, `ui`, `tanstack`, `cli`, `icons`) plus the official website in `www/` (TanStack Start on a Cloudflare Worker). The site is built from Passui's own components. Docs are guides at `/docs/<slug>` and component pages at `/docs/components/<slug>`, with live examples and generated API tables. Published to npm via trusted publishing from `phe-rus/passui`.

## Capabilities and Constraints

- UI works without TanStack or the CLI; dependency direction is CLI and integrations toward UI and tokens.
- No scrollbar chrome anywhere; shared base styles hide it while preserving scrolling.
- Tokens only: named color, type and shadow roles, Apple's Dynamic Type scale as `text-*` utilities, no raw Tailwind sizes or one-off values.
- Every string comes from the app; components ship no copy of their own.
- Respect the system: light/dark, text size, Reduce Motion and platform conventions.
- Typed choices for props with fixed options (size, variant, tone).
- Public site words are written for people outside Pherus.

## Brand Commitments

Name: Passui, from Pherus. Design direction recorded in `packages/ui/AGENTS.md`: "sea glass", meaning smooth, frosted, translucent satin glass with muted color depth, and fluid, spring-based motion. Blush (iPhone 15 pink) is the default accent. These are existing commitments, not decisions made during init.

## Evidence on Hand

Component catalog and generated API docs in `www/src/features/catalog/`; guides in `www/src/features/docs/content/`; `CHANGELOG.md`; `docs/architecture/`. No testimonials, customer logos or usage numbers exist; do not fabricate them.

## Product Principles

- Own the primitives: native controls, readable code, no hidden black box.
- One design language: tokens drive every surface, so nothing is one-off.
- Adapt to the system and the user: theme, text size and motion preferences come first.
- Apps own the words: Passui carries no copy.
- Optional by design: integrations and tooling never become requirements for the UI.

## Accessibility & Inclusion

Honor Reduce Motion, user text size and light/dark. Accessibility conventions follow the readable patterns of established primitive libraries; each component page documents its accessibility behavior.

---

title: Theming
summary: Light and dark, platform looks, and the colour roles behind them.
section: sections
order: 3
---

## Light and dark

Passui follows the system theme. `ThemeProvider` sets both a `class` and `data-theme`, and either attribute on any element gives that part of a screen its own appearance.

## Colour roles

Use roles, never hex: `bg-background`, `bg-elevated`, `text-label-secondary`, `bg-accent`, `bg-accent-soft`, `text-danger`. Every pairing is checked for WCAG AA contrast in the tokens package.

## Platform looks

The variants `ios:`, `android:`, `macos:`, `windows:` and `linux:` apply where the root has `data-os`, set before the first paint.

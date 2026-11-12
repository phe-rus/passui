---

title: Typography
summary: Text styles named as SwiftUI names them, and the typeset utility for long form writing.
section: sections
order: 6
---

## Text styles

Apple's Dynamic Type, named as SwiftUI names it: `text-large-title`, `text-title`, `text-headline`, `text-body`, `text-callout`, `text-subheadline`, `text-footnote` and `text-caption`. All scale with the app's text size setting.

## Long form writing

Wrap Markdown output in `typeset` for sensible headings, lists, quotes and code. Plain `h1`, `p`, `ul` and `code` need no classes of their own.

```tsx
<article className="typeset">{children}</article>;
```

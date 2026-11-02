# Website refinement audit

Audited on 2026-11-02 against the clean `main` checkout. Scope: all website
routes, domain views, 42 registered React families, example sources, settings,
preview messaging, generated API contracts, guides, AI endpoints and SEO.

## Verified defects and batches

1. **Structure and navigation:** application domains/styles lived beside `src`,
   while routes lived inside it. Catalog insertion order disagreed with the
   grouped sidebar; component previous/next navigation was absent. Sidebar
   links forced content-sized targets and most groups defaulted closed.
   Move code under `src`, align tooling/instructions, extract navigation, use
   a stable grouped order and expose component pagination.
2. **Documentation and examples:** compact date/time pickers had no additional
   examples. Dialog, Sheet and Popover snippets held `open=false` without a
   trigger. Stepper's generated snippet omitted its demonstrated bounds.
   Native HTML tables/fields duplicated existing Passui controls. Strengthen
   catalog coverage and executable snippet checks, add examples and use the
   public components throughout website views.
3. **Playground reliability:** the highlighter could display old code after
   props changed and had no rejected-import fallback. Size reporting assumed
   border-box observations always exist; showcase content was not observed.
   Unknown select values could match inherited object properties. Add bounded
   message validation, current-code fallback and resilient measurements.
4. **Landing and shell:** several visible demo buttons had no actions; the
   teaser lacked a link to the full playground and copyable highlighted code.
   The component count was stale. Continuous motion had no explicit pause,
   keyboard focus did not pause the marquee, and the accent timer did not react
   to preference changes. Add native controls and working local demo behavior,
   clear navigation, skip navigation and reduced-motion handling.

## Existing behavior retained

TanStack Start route structure and query-setting retention; canonical React
URLs and legacy component aliases; native SearchList command search in a Sheet;
clipboard manual-copy fallback; origin/source validation on preview messages;
lazy Prettier/Shiki; source-derived API references; sitemap/robots generation;
preview/404 noindex headers and same-origin preview embedding.

## Evidence boundary

Use the test/build results recorded at completion. Connected computer inventory
returned no apps or browsers, so desktop/mobile touch, focus, animation and visual
quality have no browser evidence in this environment. HTTP and server rendering
are complementary checks, not substitutes for those interactions.

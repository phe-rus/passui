# Water drop manual checklist

The morph (`packages/ui/src/lib/water-drop.ts`) runs only where `Element.animate`
exists and Reduce Motion is off, so jsdom never exercises it. Run this in
ChromeOS Chrome (`bun run dev`, the docs site) after any change to
`water-drop.ts`, `popover.tsx`, `select.tsx` or `dropdown-menu.tsx`.

Check Dropdown Menu, Context Menu, Popover and Select each time unless noted.

## Open and close

- [ ] The trigger's glass swells into the panel; content fades in late, not stretched.
- [ ] Close drops the glass back into the trigger; the trigger's face returns as it lands.
- [ ] Reverse mid-flight: close during the open, then reopen during the close. No jump, no stray ghost left in the DOM (`[data-slot="water-drop"]`).
- [ ] Rapid reopen (click five times fast) ends in a consistent open or closed state.

## Edges (move the trigger with the page scrolled, or resize the window)

- [ ] Near the bottom: panel flips above; its bottom edge sits on the trigger's bottom edge, no gap.
- [ ] Near the top: panel stays below, top edge on the trigger's top edge.
- [ ] Near the left and right: panel is shifted in, still overlapping the trigger.
- [ ] Left and right placements (Dropdown Menu `side="left"` / `"right"`, Popover `placement="right-start"`): the near edge sits on the trigger's matching edge; near the window edge it flips to the other side and still lines up.

## Select

- [ ] With a value chosen and room on screen, the selected option sits over the trigger's value text.
- [ ] With nothing chosen, the list opens at the trigger's top edge.
- [ ] Short list near the bottom: flips above without the option alignment fighting it.
- [ ] A list taller than the viewport cap (scrolls) sits below the trigger; alignment is skipped on purpose.

## Context Menu

- [ ] A small bead of glass appears at the pointer and swells into the menu; nothing in the region fades.
- [ ] Close drops the menu back into a bead at the same point, then it disappears.
- [ ] Touch long press and Shift+F10 start the bead where the press or the focused region is.
- [ ] Near the right or bottom edge the menu shifts or flips and the bead still starts at the pointer.

## Reduce Motion and fallbacks

- [ ] OS Reduce Motion on: panels pop in with scale and fade, positioned below or beside the trigger, no ghost.
- [ ] Panel without a trigger id: no morph, no errors in the console.

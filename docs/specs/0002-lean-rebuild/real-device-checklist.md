# Real device checklist: Drawer and Sheet

Run this on a real iPhone (Safari) and a real Android phone (Chrome) before each release that touches `Drawer` or `Sheet`. Spec 0003, AC-6 and AC-8 gate the release on it. jsdom cannot test touch, so nothing here is automated yet.

Device: ______ OS: ______ Browser: ______ Version: ______ Date: ______

## Drawer

- [ ] Open from a trigger. The panel slides up on the sheet curve and the backdrop fades in.
- [ ] Drag the panel down slowly past a quarter of its height and release. It dismisses.
- [ ] Flick down quickly, short of a quarter of its height. It dismisses on velocity.
- [ ] Drag down a little and release. It springs back.
- [ ] Reverse mid animation: start closing, then tap or drag it open again. It continues from where it is, with no jump.
- [ ] With `snapPoints`, release between two points. It rests at the nearer one and the order follows the flick.
- [ ] Scroll long content inside the panel. The panel does not move until the content is at its top.
- [ ] Drag the handle while content is scrolled. The panel moves.
- [ ] With `data-passui-page` on the app root, the page scales back and rounds as you drag, and eases back on close.
- [ ] Open a Drawer inside a Drawer. The parent shrinks back and Escape or an outside tap closes only the top one.

## Soft keyboard

- [ ] Focus an input in a Drawer. The input stays visible above the keyboard.
- [ ] Same for a Sheet from the bottom and a Dialog.
- [ ] Dismiss the keyboard. The panel returns to its place with no gap.
- [ ] Rotate the phone with the panel open. It resizes and stays centred or anchored.

## Sheet

- [ ] Each `side` slides from its own edge and swipes away toward it.
- [ ] A right to left page swipes toward the physical edge it opened from.

## Reduced motion

- [ ] With Reduce Motion on, panels fade instead of sliding and the page does not scale.

## Notes

/**
 * Popover — a glass surface that springs open from its trigger.
 *
 * Compound API (the only API):
 *
 * ```tsx
 * <Popover>
 *   <Popover.Trigger render={(props) => <Button {...props}>Open</Button>} />
 *   <Popover.Content origin="top-left" className="top-full left-0 mt-2 w-64 p-4">
 *     …content…
 *   </Popover.Content>
 * </Popover>
 * ```
 *
 * The `Popover.Trigger` clones its child (or uses a `render` prop) and wires
 * up aria-haspopup, aria-expanded, aria-controls, click + keyboard toggling.
 * The `Popover.Content` portals out of the authored layout, morphs its glass
 * surface from the trigger's rect, and keeps itself inside the viewport as
 * it resizes or scrolls. `origin` picks the corner it grows from; pass
 * `placement="center"` for a modal center-screen variant.
 *
 * State is driven by a small pure machine (`popover.machine.ts`) that
 * translates directly to a Rust enum — see the architecture plan.
 */

export {
	PopoverContent as Content,
	type PopoverOrigin,
} from "./popover-content";
export { PopoverRoot as Root } from "./popover-root";
export {
	PopoverTrigger as Trigger,
	type PopoverTriggerRenderProps,
} from "./popover-trigger";

import { PopoverContent } from "./popover-content";
import { PopoverRoot } from "./popover-root";
import { PopoverTrigger } from "./popover-trigger";

/**
 * Compound Popover. Use as `<Popover>` with `.Trigger` and `.Content` parts,
 * or import `Root` / `Trigger` / `Content` directly from the barrel.
 */
export const Popover = Object.assign(PopoverRoot, {
	Trigger: PopoverTrigger,
	Content: PopoverContent,
});

export type { PopoverContentProps } from "./popover-content";
export type { PopoverRootProps } from "./popover-root";
export type { PopoverTriggerProps } from "./popover-trigger";

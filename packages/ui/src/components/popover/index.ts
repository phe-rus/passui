// Legacy Popover (anchorRef-based — the current production API)
// This is what consumers import as `Popover` today.
export {
	Popover,
	type PopoverProps,
	type PopoverOrigin,
	type PopoverSize,
} from "./popover";

// New compound Popover (Root/Trigger/Content with state machine)
// Experimental — import as `PopoverV2` from the barrel, or use
// `Popover.Root` / `Popover.Trigger` / `Popover.Content`.
export { PopoverRoot as Root } from "./popover-root";
export {
	PopoverTrigger as Trigger,
	type PopoverTriggerRenderProps,
} from "./popover-trigger";
export { PopoverContent as Content } from "./popover-content";

// Compound object for the new API:
// <PopoverV2>
//   <PopoverV2.Trigger render={...}>...</PopoverV2.Trigger>
//   <PopoverV2.Content>...</PopoverV2.Content>
// </PopoverV2>
import { PopoverRoot } from "./popover-root";
import { PopoverTrigger } from "./popover-trigger";
import { PopoverContent } from "./popover-content";

export const PopoverV2 = Object.assign(PopoverRoot, {
	Trigger: PopoverTrigger,
	Content: PopoverContent,
});

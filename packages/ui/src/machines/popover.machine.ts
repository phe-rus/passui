/**
 * Popover state machine — pure function, no React, no DOM.
 *
 * Translates directly to a Rust enum with match arms.
 *
 * States:
 *   closed   → nothing visible
 *   opening  → surface morphing from trigger to content
 *   open     → content fully visible
 *   closing  → surface morphing back to trigger
 *
 * The OPENED/CLOSED events are fired by onAnimationComplete,
 * so the machine stays in "opening"/"closing" until the animation
 * actually finishes — enabling interruptibility (close during open).
 */
export type PopoverState = "closed" | "opening" | "open" | "closing";

export type PopoverEvent = "OPEN" | "OPENED" | "CLOSE" | "CLOSED" | "TOGGLE";

export function popoverMachine(
	state: PopoverState,
	event: PopoverEvent,
): PopoverState {
	switch (state) {
		case "closed":
			return event === "OPEN" || event === "TOGGLE" ? "opening" : "closed";
		case "opening":
			if (event === "CLOSE" || event === "TOGGLE") return "closing";
			if (event === "OPENED") return "open";
			return "opening";
		case "open":
			return event === "CLOSE" || event === "TOGGLE" ? "closing" : "open";
		case "closing":
			if (event === "OPEN" || event === "TOGGLE") return "opening";
			if (event === "CLOSED") return "closed";
			return "closing";
	}
}

export type PopoverContextValue = {
	state: PopoverState;
	send: (event: PopoverEvent) => void;
	/** The trigger element — set by PopoverTrigger, read by PopoverContent for positioning. */
	triggerRef: React.RefObject<HTMLElement | null>;
	/** Unique ID for aria-controls + layoutId morphing. */
	contentId: string;
	/** Shared layoutId for motion's matched-geometry transition. */
	surfaceId: string;
	/** Whether the popover is open or transitioning (not closed). */
	isPresent: boolean;
};

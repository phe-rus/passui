import {
	type ReactNode,
	useEffect,
	useId,
	useReducer,
	useRef,
	type RefObject,
} from "react";
import { createContext, useContext } from "react";
import {
	popoverMachine,
	type PopoverContextValue,
	type PopoverEvent,
	type PopoverState,
} from "../../machines/popover.machine";

const PopoverContext = createContext<PopoverContextValue | null>(null);

export function usePopover(): PopoverContextValue {
	const ctx = useContext(PopoverContext);
	if (!ctx) throw new Error("Popover parts need a <Popover.Root> parent");
	return ctx;
}

export interface PopoverRootProps {
	children: ReactNode;
	/**
	 * Start open (uncontrolled) or set the initial state.
	 * Ignored when `open` is provided.
	 */
	defaultOpen?: boolean;
	/**
	 * Controlled open state. When provided, the popover is driven by this
	 * prop: setting it to true opens, false closes. The internal machine
	 * still runs the open/close transitions so the morph can play.
	 */
	open?: boolean;
	/** Called when the popover finishes opening or closing. */
	onOpenChange?: (open: boolean) => void;
}

export function PopoverRoot({
	children,
	defaultOpen = false,
	open,
	onOpenChange,
}: PopoverRootProps) {
	const [state, dispatch] = useReducer(
		popoverMachine,
		defaultOpen ? "opening" : ("closed" satisfies PopoverState),
	);
	const triggerRef = useRef<HTMLElement | null>(null);
	const contentId = useId();
	const surfaceId = useId();
	const onOpenChangeRef = useRef(onOpenChange);

	// Keep the latest callback without re-rendering the tree.
	// eslint-disable-next-line react-hooks/exhaustive-deps
	onOpenChangeRef.current = onOpenChange;

	const send = (event: PopoverEvent) => {
		const next = popoverMachine(state, event);
		if (next !== state) {
			dispatch(event);
			// Fire onOpenChange only when fully open or fully closed — not
			// during transitions. This lets the consumer close the popover
			// (set open=false) and have it animate out, rather than unmounting.
			if (next === "open") onOpenChangeRef.current?.(true);
			if (next === "closed") onOpenChangeRef.current?.(false);
		}
	};

	// Controlled mode: drive OPEN/CLOSE from the `open` prop. The machine
	// still runs the morph transitions; we only nudge it when the desired
	// presence differs from the current presence.
	const present = state !== "closed";
	useEffect(() => {
		if (open === undefined) return;
		if (open && !present) send("OPEN");
		if (!open && present) send("CLOSE");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	const isPresent = present;

	return (
		<PopoverContext
			value={{ state, send, triggerRef, contentId, surfaceId, isPresent }}
		>
			{children}
		</PopoverContext>
	);
}

// Re-export the context type for consumers that need it.
export type { PopoverContextValue };
export type { RefObject };

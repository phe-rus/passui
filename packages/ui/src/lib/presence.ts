import { useLayoutEffect, useRef, useState } from "react";

type Phase = "closed" | "starting" | "open" | "ending";

/** Lets a panel run its own enter and exit motion while presence keeps it mounted. */
export interface PresenceHooks<T extends HTMLElement = HTMLElement> {
	/** Runs once the panel has mounted, and again when a close is reversed. */
	enter?: (el: T) => void;
	/** Runs the moment `open` turns false. Animations started here hold the panel mounted until they end. */
	exit?: (el: T) => void;
}

/**
 * Keeps a panel mounted until its CSS exit transition ends.
 *
 * `data-starting-style` is present for the first frame after mounting and
 * `data-ending-style` from the moment `open` turns false. Both are removed or
 * added by attribute only, so a transition reversed mid flight continues from
 * its current position instead of jumping. Without transitions (or without
 * `getAnimations`, as in jsdom) the panel unmounts at once.
 */
export function usePresence<T extends HTMLElement = HTMLDivElement>(
	open: boolean,
	hooks?: PresenceHooks<NoInfer<T>>,
) {
	const ref = useRef<T | null>(null);
	const [phase, setPhase] = useState<Phase>(open ? "open" : "closed");
	const hooksRef = useRef(hooks);
	hooksRef.current = hooks;
	const previous = useRef<Phase>(phase);

	// Derived from `open`, so the reversal needs no effect and no extra frame.
	if (open && phase === "closed") setPhase("starting");
	else if (open && phase === "ending") setPhase("open");
	else if (!open && (phase === "open" || phase === "starting"))
		setPhase("ending");

	useLayoutEffect(() => {
		const was = previous.current;
		previous.current = phase;
		const el = ref.current;
		if (phase === "starting") {
			// Reading layout commits the starting styles before they are removed.
			el?.getBoundingClientRect();
			if (el) hooksRef.current?.enter?.(el);
			setPhase("open");
			return;
		}
		// A close that was reversed mid flight opens again from where it is.
		if (phase === "open" && was === "ending" && el)
			hooksRef.current?.enter?.(el);
		if (phase !== "ending") return;
		// Before the exit is measured, so animations it starts keep the panel mounted.
		if (el) hooksRef.current?.exit?.(el);
		let cancelled = false;
		const animations = el?.getAnimations?.() ?? [];
		if (animations.length === 0) setPhase("closed");
		else
			Promise.allSettled(animations.map((a) => a.finished)).then(() => {
				if (!cancelled) setPhase("closed");
			});
		return () => {
			cancelled = true;
		};
	}, [phase]);

	return {
		ref,
		mounted: phase !== "closed",
		attrs: {
			"data-starting-style": phase === "starting" ? "" : undefined,
			"data-ending-style": phase === "ending" ? "" : undefined,
		},
	};
}

import { useLayoutEffect, useRef, useState } from "react";

type Phase = "closed" | "starting" | "open" | "ending";

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
) {
	const ref = useRef<T | null>(null);
	const [phase, setPhase] = useState<Phase>(open ? "open" : "closed");

	// Derived from `open`, so the reversal needs no effect and no extra frame.
	if (open && phase === "closed") setPhase("starting");
	else if (open && phase === "ending") setPhase("open");
	else if (!open && (phase === "open" || phase === "starting"))
		setPhase("ending");

	useLayoutEffect(() => {
		if (phase === "starting") {
			// Reading layout commits the starting styles before they are removed.
			ref.current?.getBoundingClientRect();
			setPhase("open");
			return;
		}
		if (phase !== "ending") return;
		let cancelled = false;
		const animations = ref.current?.getAnimations?.() ?? [];
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

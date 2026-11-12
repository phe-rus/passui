import { type RefObject, useLayoutEffect } from "react";

/**
 * Lets a panel's own swipe win on a touch screen. A touch that starts a pan the
 * browser is allowed to scroll is handed to the browser, which cancels the
 * pointer events the drag needs, so the panel could only be dragged by its
 * handle. Where the content does not scroll along the swipe axis, tell the
 * browser it may only pan across that axis, and the body can be dragged too.
 * Content that does scroll keeps native scrolling; its handle still drags.
 */
export function useSwipeTouchAction(
	ref: RefObject<HTMLElement | null>,
	active: boolean,
	axis: "x" | "y",
) {
	useLayoutEffect(() => {
		const el = ref.current;
		if (!active || !el) return;
		const apply = () => {
			const scrolls =
				axis === "y"
					? el.scrollHeight > el.clientHeight + 1
					: el.scrollWidth > el.clientWidth + 1;
			el.style.touchAction = scrolls ? "" : axis === "y" ? "pan-x" : "pan-y";
		};
		apply();
		if (typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(apply);
		observer.observe(el);
		for (const child of el.children) observer.observe(child);
		return () => {
			observer.disconnect();
			el.style.touchAction = "";
		};
	}, [ref, active, axis]);
}

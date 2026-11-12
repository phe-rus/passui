import { type RefObject, useEffect } from "react";

/**
 * Keeps `--visual-viewport-height` and `--visual-viewport-top` on the element
 * current, so a panel sized from them stays above the soft keyboard.
 */
export function useVisualViewportVars(
	ref: RefObject<HTMLElement | null>,
	enabled: boolean,
) {
	useEffect(() => {
		const el = ref.current;
		const viewport = window.visualViewport;
		if (!enabled || !el || !viewport) return;
		const write = () => {
			el.style.setProperty("--visual-viewport-height", `${viewport.height}px`);
			el.style.setProperty("--visual-viewport-top", `${viewport.offsetTop}px`);
		};
		write();
		viewport.addEventListener("resize", write);
		viewport.addEventListener("scroll", write);
		return () => {
			viewport.removeEventListener("resize", write);
			viewport.removeEventListener("scroll", write);
			el.style.removeProperty("--visual-viewport-height");
			el.style.removeProperty("--visual-viewport-top");
		};
	}, [ref, enabled]);
}

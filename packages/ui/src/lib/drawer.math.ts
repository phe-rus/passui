import { pageScale } from "@passui/tokens/motion";

/** Where the page behind a Drawer sits while the drawer is `openness` open. */
export interface PageTransform {
	/** Uniform scale, 1 when no drawer is open. */
	scale: number;
	/** Corner radius in px. */
	radius: number;
	/** Downward shift in px, so the scaled page hangs from the top edge. */
	translateY: number;
}

export const clamp01 = (value: number) =>
	Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

/**
 * Page scale for a drawer that is `openness` open (0 closed, 1 fully open).
 * Fully open the page ends `topOffset` px below the top of the screen:
 * scale = (width - topOffset) / width, eased back to 1 as the drawer closes.
 */
export function pageTransformAt(
	openness: number,
	viewportWidth: number,
): PageTransform {
	const o = clamp01(openness);
	const width = Math.max(viewportWidth, 1);
	const full = Math.max(0, (width - pageScale.topOffset) / width);
	return {
		scale: 1 - (1 - full) * o,
		radius: pageScale.radius * o,
		translateY: (pageScale.topOffset / 2) * o,
	};
}

/** With nested drawers the page stays as scaled as the most open one. */
export function frontOpenness(layers: Iterable<number>): number {
	let max = 0;
	for (const value of layers) max = Math.max(max, clamp01(value));
	return max;
}

/** The tallest numeric snap point (a fraction of the viewport), or null if none. */
export function tallestSnapPoint(
	snapPoints: ReadonlyArray<number | string> | undefined,
): number | null {
	const numbers = (snapPoints ?? []).filter(
		(point): point is number => typeof point === "number",
	);
	return numbers.length > 0 ? Math.max(...numbers) : null;
}

export type MenuRect = {
	left: number;
	top: number;
	width: number;
	height: number;
};

/** Return toward the source while handing its material back to the real trigger. */
export function menuSurfaceExit(source: ReturnType<typeof menuSurfaceReveal>) {
	return { ...source, opacity: 0 };
}

/** Animate the material's bounds independently so menu text never stretches. */
export function menuSurfaceReveal(
	source: MenuRect | undefined,
	target: MenuRect & { radius?: number },
) {
	if (
		!source ||
		source.width <= 0 ||
		source.height <= 0 ||
		target.width <= 0 ||
		target.height <= 0
	) {
		return {
			x: 0,
			y: -4,
			width: target.width,
			height: target.height,
			opacity: 0,
			borderRadius: target.radius ?? 0,
		};
	}
	return {
		x: source.left - target.left,
		y: source.top - target.top,
		width: source.width,
		height: source.height,
		opacity: 1,
		borderRadius: Math.min(source.width, source.height) / 2,
	};
}

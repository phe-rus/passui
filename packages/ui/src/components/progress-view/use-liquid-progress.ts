import { type RefObject, useLayoutEffect, useRef } from "react";
import { useMediaQuery } from "../../hooks/use-media-query";
import { clampRange } from "../../lib/range-value";
import { stepLiquid } from "../slosh-slider/liquid-step";

/** Read-only progress shares the liquid fill without acquiring slider semantics. */
export function useLiquidProgress(
	ref: RefObject<HTMLDivElement | null>,
	target: number | undefined,
) {
	const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
	const state = useRef({ fill: target ?? 0, velocity: 0 });
	useLayoutEffect(() => {
		const element = ref.current;
		if (!element || target === undefined) return;
		let frame = 0;
		let previous = 0;
		const paint = () => {
			element.style.width = `${state.current.fill}%`;
			element.style.setProperty(
				"--progress-lean",
				`${reduced ? 0 : clampRange(state.current.velocity * 0.4, -4, 4)}px`,
			);
		};
		if (reduced) {
			state.current = { fill: target, velocity: 0 };
			paint();
			return;
		}
		const tick = (now: number) => {
			const dt = previous ? Math.min(2.5, (now - previous) / 16.67) : 1;
			previous = now;
			state.current = stepLiquid(state.current, target, 15, dt);
			paint();
			if (state.current.fill !== target || state.current.velocity)
				frame = requestAnimationFrame(tick);
		};
		paint();
		if (state.current.fill !== target || state.current.velocity)
			frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [ref, target, reduced]);
}

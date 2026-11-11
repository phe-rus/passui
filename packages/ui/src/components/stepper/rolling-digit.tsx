import { useEffect, useRef } from "react";
import { useMediaQuery } from "../../hooks/use-media-query";

/** Counts at a place retain carries: the tens column of 1284 targets 128. */
export function digitAt(count: number) {
	return ((Math.floor(count) % 10) + 10) % 10;
}

export function advanceDigit(
	position: number,
	velocity: number,
	target: number,
	frames: number,
) {
	const nextVelocity =
		(velocity + (target - position) * 0.16 * frames) * 0.7 ** frames;
	return { position: position + nextVelocity * frames, velocity: nextVelocity };
}

/** Three recycled cells keep the strip continuous through either side of zero. */
export function RollingDigit({
	count,
	place,
}: {
	count: number;
	place: number;
}) {
	const strip = useRef<HTMLSpanElement>(null);
	const state = useRef({ position: count, velocity: 0 });
	const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
	useEffect(() => {
		let frame = 0;
		let previous = 0;
		let due = 0;
		const paint = (position: number, velocity: number) => {
			const node = strip.current;
			if (!node) return;
			const base = Math.floor(position);
			for (let index = 0; index < node.children.length; index++) {
				node.children[index]!.textContent = String(digitAt(base + index - 1));
			}
			node.style.transform = `translateY(${(-(position - base + 1) * 100) / 3}%)`;
			node.style.filter = `blur(${Math.min(2, Math.abs(velocity) * 1.4)}px)`;
		};
		if (reduced) {
			state.current = { position: count, velocity: 0 };
			paint(count, 0);
			return;
		}
		const tick = (now: number) => {
			if (!due) due = now + place * 28;
			const frames = previous ? Math.min((now - previous) / (1000 / 60), 2) : 1;
			previous = now;
			if (now >= due) {
				state.current = advanceDigit(
					state.current.position,
					state.current.velocity,
					count,
					frames,
				);
				if (
					Math.abs(count - state.current.position) < 0.002 &&
					Math.abs(state.current.velocity) < 0.002
				) {
					state.current = { position: count, velocity: 0 };
					paint(count, 0);
					return;
				}
				paint(state.current.position, state.current.velocity);
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [count, place, reduced]);
	return (
		<span className="relative inline-block h-[1.5em] w-[1ch] overflow-hidden align-middle">
			<span
				ref={strip}
				className="absolute inset-x-0 top-0 flex flex-col leading-[1.5em]"
				style={{ transform: "translateY(-33.333333%)" }}
			>
				<span>{digitAt(count - 1)}</span>
				<span>{digitAt(count)}</span>
				<span>{digitAt(count + 1)}</span>
			</span>
		</span>
	);
}

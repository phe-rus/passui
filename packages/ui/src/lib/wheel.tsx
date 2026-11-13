"use client";

import {
	type KeyboardEvent,
	type ReactNode,
	useEffect,
	useId,
	useRef,
} from "react";
import { cx } from "./cx";
import { haptic } from "./haptics";

/** Height of one row, in px. Rows are the unit the wheel snaps to. */
export const WHEEL_ROW = 32;
/** Rows visible at once; odd, so the chosen row sits in the middle. */
const VISIBLE_ROWS = 7;

export interface WheelOption<T extends string | number> {
	value: T;
	label: ReactNode;
	disabled?: boolean;
}

interface WheelProps<T extends string | number> {
	options: readonly WheelOption<T>[];
	value: T;
	onValueChange: (value: T) => void;
	/** Names the wheel for assistive technology. */
	label: string;
	className?: string;
	/** Draws the chosen row's band. Turn it off when several wheels share one band. @default true */
	band?: boolean;
	/** Where the text sits in its column. @default "center" */
	align?: "start" | "center" | "end";
}

/**
 * A snapping column of choices, like the wheels in iOS date pickers: scroll,
 * flick or tap a row and it settles in the middle. Rows fade and shrink away
 * from the middle, and each row passed ticks the haptic. Up and Down arrows,
 * Home and End also move it, so it works without a pointer.
 */
export function Wheel<T extends string | number>({
	options,
	value,
	onValueChange,
	label,
	className,
	band = true,
	align = "center",
}: WheelProps<T>) {
	const id = useId();
	const scroller = useRef<HTMLDivElement>(null);
	const frame = useRef(0);
	const settle = useRef(0);
	const lastTick = useRef(-1);
	const index = Math.max(
		0,
		options.findIndex((option) => option.value === value),
	);
	const latest = useRef({ options, index, onValueChange });
	latest.current = { options, index, onValueChange };

	/** Fades and shrinks each row by its distance from the middle. */
	const shape = () => {
		const node = scroller.current;
		if (!node) return;
		const middle = node.scrollTop / WHEEL_ROW;
		const rows = node.children;
		const from = Math.max(0, Math.floor(middle) - 4);
		const to = Math.min(rows.length - 1, Math.ceil(middle) + 4);
		for (let row = from; row <= to; row++) {
			// The text carries the fade and shrink, never the row: scroll snap reads
			// the row's box, and a scaled row drifts the wheel off its centre.
			const element = (rows[row] as HTMLElement)
				.firstElementChild as HTMLElement | null;
			if (!element) continue;
			const distance = Math.abs(row - middle);
			element.style.opacity = String(Math.max(0.2, 1 - distance * 0.28));
			element.style.transform = `scale(${1 - Math.min(distance, 3) * 0.05})`;
		}
	};

	const goTo = (target: number, smooth: boolean) => {
		scroller.current?.scrollTo({
			top: target * WHEEL_ROW,
			behavior: smooth ? "smooth" : "instant",
		});
	};

	// Follow the value when it changes from outside, and start on it.
	// biome-ignore lint/correctness/useExhaustiveDependencies: `options` is read through `latest`; only the chosen row should move the wheel.
	useEffect(() => {
		const node = scroller.current;
		if (!node) return;
		const here = Math.round(node.scrollTop / WHEEL_ROW);
		if (here !== index) goTo(index, node.scrollTop > 0);
		shape();
	}, [index]);

	// A panel that is still opening, scaled or hidden reports a different size,
	// and the browser leaves the scroll a few pixels off the row. Put the chosen
	// row back in the middle whenever the box changes size, unless a hand is on it.
	useEffect(() => {
		const node = scroller.current;
		if (!node) return;
		const resync = () => {
			if (settle.current) return;
			const target = latest.current.index * WHEEL_ROW;
			if (Math.abs(node.scrollTop - target) > 0.5) node.scrollTop = target;
			shape();
		};
		const observer = new ResizeObserver(resync);
		observer.observe(node);
		const late = window.setTimeout(resync, 400);
		return () => {
			observer.disconnect();
			clearTimeout(late);
		};
	}, []);

	useEffect(
		() => () => {
			cancelAnimationFrame(frame.current);
			clearTimeout(settle.current);
		},
		[],
	);

	const onScroll = () => {
		cancelAnimationFrame(frame.current);
		frame.current = requestAnimationFrame(shape);
		const node = scroller.current;
		if (!node) return;
		const row = Math.round(node.scrollTop / WHEEL_ROW);
		if (row !== lastTick.current) {
			if (lastTick.current !== -1) haptic("selection");
			lastTick.current = row;
		}
		clearTimeout(settle.current);
		settle.current = window.setTimeout(() => {
			settle.current = 0;
			const {
				options: all,
				index: current,
				onValueChange: emit,
			} = latest.current;
			const chosen = all[Math.min(all.length - 1, Math.max(0, row))];
			if (chosen && !chosen.disabled && row !== current) emit(chosen.value);
			// Land exactly on the row; a pointer that stopped mid row leaves it a little off.
			if (node && Math.abs(node.scrollTop - row * WHEEL_ROW) > 0.5)
				goTo(Math.min(all.length - 1, Math.max(0, row)), true);
		}, 110);
	};

	const onKeyDown = (event: KeyboardEvent) => {
		const step =
			event.key === "ArrowDown"
				? 1
				: event.key === "ArrowUp"
					? -1
					: event.key === "PageDown"
						? 5
						: event.key === "PageUp"
							? -5
							: 0;
		const target =
			event.key === "Home"
				? 0
				: event.key === "End"
					? options.length - 1
					: Math.min(options.length - 1, Math.max(0, index + step));
		if (!step && event.key !== "Home" && event.key !== "End") return;
		event.preventDefault();
		const option = options[target];
		if (option && !option.disabled) onValueChange(option.value);
	};

	const edge = ((VISIBLE_ROWS - 1) / 2) * WHEEL_ROW;
	return (
		<div
			data-slot="wheel"
			className={cx("relative", className)}
			style={{ height: VISIBLE_ROWS * WHEEL_ROW }}
		>
			{/* The band the chosen row sits in. */}
			{band ? (
				<div
					aria-hidden="true"
					className="bg-fill/70 pointer-events-none absolute inset-x-0 rounded-xl"
					style={{ top: edge, height: WHEEL_ROW }}
				/>
			) : null}
			<div
				ref={scroller}
				role="listbox"
				tabIndex={0}
				aria-label={label}
				aria-activedescendant={`${id}-${index}`}
				onScroll={onScroll}
				onKeyDown={onKeyDown}
				className="no-scrollbar focus-visible:ring-accent/70 relative h-full overflow-y-auto overscroll-contain rounded-xl [mask-image:linear-gradient(transparent,black_28%,black_72%,transparent)] outline-none focus-visible:ring-2"
				style={{ paddingBlock: edge }}
			>
				{options.map((option, row) => (
					// biome-ignore lint/a11y/useKeyWithClickEvents: the listbox owns the keyboard (arrows, Home, End); rows only add the pointer.
					<div
						key={option.value}
						id={`${id}-${row}`}
						role="option"
						aria-selected={row === index}
						aria-disabled={option.disabled || undefined}
						tabIndex={-1}
						onClick={() => {
							if (option.disabled) return;
							onValueChange(option.value);
							goTo(row, true);
						}}
						className={cx(
							"text-body text-label flex cursor-pointer items-center px-3 tabular-nums select-none",
							align === "center" && "justify-center",
							align === "start" && "justify-start",
							align === "end" && "justify-end",
							row === index && "font-medium",
							option.disabled && "pointer-events-none opacity-30",
						)}
						style={{ height: WHEEL_ROW }}
					>
						<span className="block origin-center will-change-transform">
							{option.label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

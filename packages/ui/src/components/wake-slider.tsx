// Adapted from Bencho. See THIRD_PARTY_NOTICES.md for the MIT notice.
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../../hooks/use-media-query";
import { cn } from "../../lib/class-names";
import { clampRange as clamp } from "../../lib/range-value";

/* ══ Wake slider ══════════════════════════════════════════
   A range with no thumb: a row of thin bars, solid up to the
   value and faint after it, with the reading beside them. Drag
   anywhere along it. Drag slowly and the bars simply fill; drag
   fast and every bar the value sweeps past springs up, taller the
   faster you went, and settles back — a wake left behind the hand.

   ── EACH BAR HOLDS A LITTLE ENERGY ──────────────────────
   When the value crosses a bar, that bar takes energy from the
   speed of the drag. Every frame all of it decays at the same
   rate, so the bars crossed longest ago have fallen furthest: the
   tallest ones are always at the hand and the run tails off
   behind it. That falloff IS the wake; nothing draws it.

   ── WRITTEN, NOT RENDERED ───────────────────────────────
   The heights change every frame, so they go straight onto each
   bar's transform from a ref. React renders when the value
   changes, which is what the reading and the colours need, and
   the loop runs only while some bar still has energy. */

const H: Record<WakeSliderSize, number> = { sm: 16, md: 20, lg: 26 }; // a bar at rest, px

export type WakeSliderSize = "sm" | "md" | "lg";

export interface WakeSliderProps {
	label: string;
	value?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	bars?: number;
	wake?: number;
	disabled?: boolean;
	className?: string;
	formatValue?: (value: number) => string;
	/** Bar height at rest and value text scale. @default "md" */
	size?: WakeSliderSize;
}

export function WakeSlider({
	label,
	value: controlledValue,
	defaultValue = 50,
	onChange,
	disabled = false,
	className,
	formatValue,
	size = "md",
	/* how many bars make the track */
	bars = 36,
	/* how high the wake rises, 0..100 */
	wake = 60,
}: WakeSliderProps) {
	const n = Math.round(clamp(Number.isFinite(bars) ? bars : 36, 12, 64));
	const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
	const [value, setValue] = useState(() =>
		clamp(controlledValue ?? defaultValue, 0, 100),
	);
	const track = useRef<HTMLDivElement | null>(null);
	const els = useRef<(HTMLSpanElement | null)[]>([]);
	const st = useRef({
		energy: new Float32Array(n),
		down: false,
		lastX: 0,
		lastT: 0,
		speed: 0,
		raf: 0,
		at: value / 100, // the value as a fraction, without React in the way
		lastBar: -1,
	});
	const knob = useRef(wake);
	knob.current = reduced ? 0 : clamp(wake, 0, 100);
	useEffect(() => {
		if (controlledValue === undefined) return;
		const next = clamp(controlledValue, 0, 100);
		st.current.at = next / 100;
		setValue(next);
	}, [controlledValue]);

	useEffect(() => {
		if (!reduced) return;
		cancelAnimationFrame(st.current.raf);
		st.current.raf = 0;
		st.current.energy.fill(0);
		for (const bar of els.current) if (bar) bar.style.transform = "none";
	}, [reduced]);

	/* a new bar count is a new row */
	useEffect(() => {
		st.current.energy = new Float32Array(n);
	}, [n]);

	const loop = () => {
		const s = st.current;
		if (s.raf) return;
		let prev = performance.now();
		const run = (now: number) => {
			const dt = Math.min(0.05, (now - prev) / 1000);
			prev = now;
			let live = false;
			const fall = Math.exp(-dt * 6.5);
			for (let i = 0; i < s.energy.length; i++) {
				s.energy[i] *= fall;
				if (s.energy[i] < 0.002) s.energy[i] = 0;
				else live = true;
				const b = els.current[i];
				/* up to 2.6 times as tall at the very top of the knob */
				if (b)
					b.style.transform = `scaleY(${(1 + s.energy[i] * 1.6).toFixed(3)})`;
			}
			s.raf = live ? requestAnimationFrame(run) : 0;
		};
		s.raf = requestAnimationFrame(run);
	};

	useEffect(() => () => cancelAnimationFrame(st.current.raf), []);

	/* move the value to a fraction, waking every bar it passes */
	const to = (f: number, speed: number) => {
		const s = st.current;
		f = clamp(f, 0, 1);
		const from = s.at;
		s.at = f;
		const a = Math.round(from * (n - 1));
		const b = Math.round(f * (n - 1));
		/* how hard: the drag's speed in bars per second, through a
       curve that saturates, scaled by the knob */
		const push = (1 - Math.exp(-speed / 900)) * (knob.current / 60);
		const lo = Math.min(a, b);
		const hi = Math.max(a, b);
		for (let i = lo; i <= hi; i++) s.energy[i] = Math.max(s.energy[i], push);
		if (b !== s.lastBar) {
			s.lastBar = b;
		}
		const next = Math.round(f * 100);
		setValue(next);
		onChange?.(next);
		if (!reduced && knob.current > 0) loop();
	};

	const frac = (clientX: number) => {
		const r = (track.current ?? document.body).getBoundingClientRect();
		const fraction = r.width ? (clientX - r.left) / r.width : 0;
		return getComputedStyle(track.current ?? document.body).direction === "rtl"
			? 1 - fraction
			: fraction;
	};

	const lit = Math.round((value / 100) * (n - 1));

	return (
		<div
			className={cn(
				"passui-wake-slider not-typeset",
				disabled && "opacity-40",
				className,
			)}
			data-size={size}
		>
			<div
				ref={track}
				className="passui-wake-track"
				role="slider"
				tabIndex={disabled ? -1 : 0}
				aria-label={label}
				aria-disabled={disabled || undefined}
				aria-valuetext={formatValue?.(value)}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={value}
				style={{ height: H[size] * 2.6, "--wake-bars": n } as CSSProperties}
				onPointerDown={(e) => {
					if (disabled || e.button !== 0) return;
					e.currentTarget.focus();
					const s = st.current;
					try {
						e.currentTarget.setPointerCapture(e.pointerId);
					} catch {
						/* a scripted pointer */
					}
					s.down = true;
					s.lastX = e.clientX;
					s.lastT = performance.now();
					s.speed = 0;
					to(frac(e.clientX), 0);
				}}
				onPointerMove={(e) => {
					const s = st.current;
					if (!s.down || disabled) return;
					const now = performance.now();
					const dt = Math.max(0.008, (now - s.lastT) / 1000);
					/* speed in px per second, smoothed so one jittery frame
             cannot fake a fling */
					const v = Math.abs(e.clientX - s.lastX) / dt;
					s.speed = s.speed * 0.5 + v * 0.5;
					s.lastX = e.clientX;
					s.lastT = now;
					to(frac(e.clientX), s.speed);
				}}
				onPointerUp={(e) => {
					st.current.down = false;
					try {
						e.currentTarget.releasePointerCapture(e.pointerId);
					} catch {
						/* never captured */
					}
				}}
				onLostPointerCapture={() => {
					st.current.down = false;
				}}
				onPointerCancel={() => {
					st.current.down = false;
				}}
				onKeyDown={(e) => {
					if (disabled) return;
					const step = e.shiftKey ? 10 : 1;
					let next: number | null = null;
					const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
					if (
						e.key === "ArrowUp" ||
						e.key === (rtl ? "ArrowLeft" : "ArrowRight")
					)
						next = value + step;
					if (
						e.key === "ArrowDown" ||
						e.key === (rtl ? "ArrowRight" : "ArrowLeft")
					)
						next = value - step;
					if (e.key === "Home") next = 0;
					if (e.key === "End") next = 100;
					if (next === null) return;
					e.preventDefault();
					/* a key press is a small, quick step: a little wake */
					to(clamp(next, 0, 100) / 100, 600);
				}}
			>
				{Array.from({ length: n }, (_, i) => (
					<span
						key={i}
						ref={(b) => {
							els.current[i] = b;
						}}
						aria-hidden="true"
						className="passui-wake-bar"
						data-on={(value > 0 && i <= lit) || undefined}
						style={{ height: H[size] }}
					/>
				))}
			</div>
			<span aria-hidden="true" className="passui-wake-value">
				{formatValue?.(value) ?? value}
			</span>
		</div>
	);
}

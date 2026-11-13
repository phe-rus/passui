"use client";

// Adapted from Bencho. See THIRD_PARTY_NOTICES.md for the MIT notice.
import { type CSSProperties, useEffect, useRef } from "react";
import { useMediaQuery } from "../hooks/use-media-query";
import { cx } from "../lib/cx";
import { stepLiquid } from "../lib/liquid-step";
import { clampRange as clamp } from "../lib/range-value";

export type SloshSliderSize = "sm" | "md" | "lg";

export interface SloshSliderProps {
	label: string;
	value?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	/** 0 is rigid; 100 is loose liquid. @default 15 */
	viscosity?: number;
	/** How far the handle coasts after release, 0–100. @default 55 */
	momentum?: number;
	/** Lean of the liquid's leading edge, 0–100. @default 45 */
	tilt?: number;
	/** Track corner, from square to a pill, 0–20. @default 20 */
	corner?: number;
	/** Track height and knob scale. @default "md" */
	size?: SloshSliderSize;
	disabled?: boolean;
	className?: string;
	formatValue?: (value: number) => string;
}

/* A slider whose value has mass.

   The handle is rigid — it is under your finger and anything under a
   finger that lags it is broken. The FILL is a second spring behind it,
   softer and barely damped, so a fast drag throws it past the handle,
   into the end stop, and rocks it back before it settles.

   The tilt is what sells it as liquid. A bar that lags is a laggy bar;
   a bar whose leading edge leans has a meniscus. Same lag, different object.

   The loop writes geometry directly and parks as soon as it rests.
   React receives only changed integer values for the application's state. */
export function SloshSlider({
	label,
	value,
	defaultValue = 62,
	onChange,
	viscosity = 15,
	momentum = 55,
	tilt = 45,
	corner = 20,
	size = "md",
	disabled = false,
	className,
	formatValue,
}: SloshSliderProps) {
	const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
	const track = useRef<HTMLDivElement>(null);
	const fillEl = useRef<HTMLDivElement>(null);
	const knobEl = useRef<HTMLDivElement>(null);
	const initial = clamp(value ?? defaultValue, 0, 100);
	const state = useRef({
		value: initial,
		handleVelocity: 0,
		fill: initial,
		velocity: 0,
		held: false,
		raf: 0,
		previous: 0,
		last: { value: initial, time: 0 },
		notified: Math.round(initial),
	});
	const settings = useRef({
		viscosity,
		momentum,
		tilt,
		reduced,
		onChange,
		formatValue,
	});
	settings.current = {
		viscosity,
		momentum,
		tilt,
		reduced,
		onChange,
		formatValue,
	};
	const run = useRef<() => void>(() => {});

	useEffect(() => {
		const s = state.current;
		const paint = () => {
			if (!track.current || !fillEl.current || !knobEl.current) return;
			fillEl.current.style.width = `${s.fill.toFixed(2)}%`;
			knobEl.current.style.insetInlineStart = `${s.value.toFixed(2)}%`;
			/* Proportional to how fast the fill is actually moving: upright
               at rest, so it cannot be decoration when nothing travels. */
			const lean = settings.current.reduced
				? 0
				: clamp(
						(clamp(settings.current.tilt, 0, 100) / 100) * s.velocity * 3,
						-20,
						20,
					);
			fillEl.current.style.setProperty("--slosh-lean", `${lean.toFixed(2)}px`);
			const next = Math.round(s.value);
			track.current.setAttribute("aria-valuenow", String(next));
			const spoken = settings.current.formatValue?.(next);
			if (spoken) track.current.setAttribute("aria-valuetext", spoken);
			else track.current.removeAttribute("aria-valuetext");
			if (s.notified !== next) {
				s.notified = next;
				settings.current.onChange?.(next);
			}
		};
		const tick = (time: number) => {
			const dt = s.previous ? clamp((time - s.previous) / 16.67, 0, 2.5) : 1;
			s.previous = time;
			const knobs = settings.current;
			/* Friction is per frame, raised to dt: a dropped frame must
               not double the deceleration. The release is a throw, not a stop. */
			if (!s.held && s.handleVelocity) {
				s.value += s.handleVelocity * dt;
				s.handleVelocity *=
					(0.86 + (clamp(knobs.momentum, 0, 100) / 100) * 0.115) ** dt;
				if (s.value <= 0 || s.value >= 100) {
					s.value = clamp(s.value, 0, 100);
					s.handleVelocity = 0;
				}
				if (Math.abs(s.handleVelocity) < 0.01) s.handleVelocity = 0;
			}
			const next = stepLiquid(
				s,
				s.value,
				knobs.reduced ? 0 : knobs.viscosity,
				dt,
			);
			s.fill = next.fill;
			s.velocity = next.velocity;
			paint();
			if (
				!s.handleVelocity &&
				!s.velocity &&
				Math.abs(s.fill - s.value) < 0.02
			) {
				s.raf = 0;
				s.previous = 0;
				return;
			}
			s.raf = requestAnimationFrame(tick);
		};
		run.current = () => {
			// The handle paints on the input event; it never waits for the fill.
			paint();
			if (!s.raf) s.raf = requestAnimationFrame(tick);
		};
		paint();
		return () => {
			cancelAnimationFrame(s.raf);
			s.raf = 0;
			s.previous = 0;
		};
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Motion settings can wake a parked loop without changing its value.
	useEffect(() => {
		const s = state.current;
		if (
			value !== undefined &&
			Math.round(clamp(value, 0, 100)) !== s.notified
		) {
			s.value = clamp(value, 0, 100);
			s.notified = Math.round(s.value);
			s.handleVelocity = 0;
		}
		if (reduced || disabled) {
			s.handleVelocity = 0;
			s.held = false;
		}
		run.current();
	}, [value, reduced, disabled, viscosity, tilt, formatValue]);

	const readAt = (clientX: number) => {
		const t = track.current;
		if (!t) return 0;
		const box = t.getBoundingClientRect();
		const fraction = box.width ? (clientX - box.left) / box.width : 0;
		return clamp(
			(getComputedStyle(t).direction === "rtl" ? 1 - fraction : fraction) * 100,
			0,
			100,
		);
	};
	const release = (cancelled = false) => {
		const s = state.current;
		if (!s.held) return;
		s.held = false;
		/* Leaves along its measured velocity, capped so a full-track flick
           does not simply pin it. A cancelled gesture never throws. */
		s.handleVelocity =
			cancelled || reduced ? 0 : clamp(s.handleVelocity, -6, 6);
		if (performance.now() - s.last.time > 100) s.handleVelocity = 0;
		run.current();
	};
	return (
		<div
			className={cx(
				"passui-slosh-slider not-typeset",
				disabled && "opacity-40",
				className,
			)}
			style={{ "--slosh-radius": `${clamp(corner, 0, 20)}px` } as CSSProperties}
			data-size={size}
		>
			{/* Nothing but the track: the liquid is the value's motion, not a
            second numeric readout that lags and overshoots beside it. */}
			<div
				ref={track}
				className="passui-slosh-track"
				role="slider"
				tabIndex={disabled ? -1 : 0}
				aria-label={label}
				aria-disabled={disabled || undefined}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={Math.round(initial)}
				aria-valuetext={formatValue?.(Math.round(initial))}
				onPointerDown={(event) => {
					if (disabled || event.button !== 0) return;
					event.currentTarget.focus();
					event.currentTarget.setPointerCapture(event.pointerId);
					const s = state.current;
					s.held = true;
					s.handleVelocity = 0;
					s.value = readAt(event.clientX);
					s.last = { value: s.value, time: performance.now() };
					run.current();
				}}
				onPointerMove={(event) => {
					const s = state.current;
					if (!s.held || disabled) return;
					const next = readAt(event.clientX);
					const now = performance.now();
					/* Per frame, not per ms: the loop's release velocity must
                   use the same unit as the spring. */
					s.handleVelocity =
						((next - s.last.value) / Math.max(1, now - s.last.time)) * 16.67;
					s.last = { value: next, time: now };
					s.value = next;
					run.current();
				}}
				onPointerUp={() => release()}
				onPointerCancel={() => release(true)}
				onLostPointerCapture={() => release(true)}
				onKeyDown={(event) => {
					if (disabled) return;
					const s = state.current;
					const step = event.shiftKey ? 10 : 2;
					const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
					const next =
						event.key === "ArrowUp" ||
						event.key === (rtl ? "ArrowLeft" : "ArrowRight")
							? s.value + step
							: event.key === "ArrowDown" ||
									event.key === (rtl ? "ArrowRight" : "ArrowLeft")
								? s.value - step
								: event.key === "Home"
									? 0
									: event.key === "End"
										? 100
										: null;
					if (next === null) return;
					event.preventDefault();
					s.handleVelocity = 0;
					s.value = clamp(next, 0, 100);
					run.current();
				}}
			>
				<div
					aria-hidden="true"
					ref={fillEl}
					className="passui-slosh-fill"
					style={{ width: `${initial}%` }}
				/>
				<div
					aria-hidden="true"
					ref={knobEl}
					className="passui-slosh-knob"
					style={{ insetInlineStart: `${initial}%` }}
				/>
			</div>
		</div>
	);
}

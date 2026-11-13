"use client";

import type { ComponentProps } from "react";
import { cx } from "../lib/cx";
import { SloshTrack } from "../lib/slosh-track";
import { WakeTrack } from "../lib/wake-track";

export type ProgressVariant = "default" | "wake" | "slosh";
export type ProgressSize = "sm" | "md" | "lg";

const heights: Record<ProgressSize, string> = {
	sm: "h-1.5",
	md: "h-2",
	lg: "h-3",
};

interface Shared {
	/** Track height, handle and reading scale. @default "md" */
	size?: ProgressSize;
	className?: string;
}

/** What the two draggable variants share: a value from 0 to 100 you set. */
interface Draggable extends Shared {
	/** Names the slider for assistive technology. */
	label: string;
	value?: number;
	defaultValue?: number;
	onValueChange?: (value: number) => void;
	disabled?: boolean;
	/** Spoken and shown reading, like "62%". */
	formatValue?: (value: number) => string;
}

export type ProgressProps =
	| (Shared &
			Omit<ComponentProps<"div">, "children" | "className"> & {
				/** A plain bar you read. @default "default" */
				variant?: "default";
				/** 0 to `max`. Leave undefined for an indeterminate bar. */
				value?: number | null;
				/** @default 100 */
				max?: number;
			})
	| (Draggable & {
			/** A row of thin bars that spring up in the wake of a fast drag. */
			variant: "wake";
			/** How many bars make the track. @default 36 */
			bars?: number;
			/** How high the wake rises, 0 to 100. @default 60 */
			wake?: number;
	  })
	| (Draggable & {
			/** A fill with mass: it lags the handle and sloshes at the end stops. */
			variant: "slosh";
			/** 0 is rigid; 100 is loose liquid. @default 15 */
			viscosity?: number;
			/** How far the handle coasts after release, 0 to 100. @default 55 */
			momentum?: number;
			/** Lean of the liquid's leading edge, 0 to 100. @default 45 */
			tilt?: number;
			/** Track corner, from square to a pill, 0 to 20. @default 20 */
			corner?: number;
	  });

/**
 * Progress in three variants. The default is a bar you read; `wake` and
 * `slosh` are the same control made draggable, with motion that carries the
 * value's momentum. All three take the accent and scale with `size`.
 */
export function Progress(props: ProgressProps) {
	if (props.variant === "wake") {
		const { variant: _, onValueChange, ...rest } = props;
		return <WakeTrack {...rest} onChange={onValueChange} />;
	}
	if (props.variant === "slosh") {
		const { variant: _, onValueChange, ...rest } = props;
		return <SloshTrack {...rest} onChange={onValueChange} />;
	}
	const {
		variant: _,
		value,
		max = 100,
		size = "md",
		className,
		...rest
	} = props;
	const determinate = typeof value === "number";
	const ratio = determinate ? Math.min(1, Math.max(0, value / max)) : 0;
	return (
		<div
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={max}
			aria-valuenow={determinate ? value : undefined}
			data-slot="progress"
			data-size={size}
			data-state={
				determinate ? (ratio >= 1 ? "complete" : "loading") : "indeterminate"
			}
			className={cx(
				"relative w-full overflow-hidden rounded-full bg-fill",
				heights[size],
				className,
			)}
			{...rest}
		>
			<div
				data-slot="progress-indicator"
				className={cx(
					"h-full rounded-full bg-accent spring-smooth transition-[width] motion-reduce:transition-none",
					!determinate && "w-2/5 animate-pulse motion-reduce:animate-none",
				)}
				style={determinate ? { width: `${ratio * 100}%` } : undefined}
			/>
		</div>
	);
}

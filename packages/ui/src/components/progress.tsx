import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

export type ProgressProps = Omit<ComponentProps<"div">, "children"> & {
	/** 0 to `max`. Leave undefined for an indeterminate bar. */
	value?: number | null;
	/** @default 100 */
	max?: number;
};

/** A read only progress bar. */
export function Progress({
	value,
	max = 100,
	className,
	...props
}: ProgressProps) {
	const determinate = typeof value === "number";
	const ratio = determinate ? Math.min(1, Math.max(0, value / max)) : 0;
	return (
		<div
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={max}
			aria-valuenow={determinate ? value : undefined}
			data-slot="progress"
			data-state={
				determinate ? (ratio >= 1 ? "complete" : "loading") : "indeterminate"
			}
			className={cx(
				"relative h-2 w-full overflow-hidden rounded-full bg-fill",
				className,
			)}
			{...props}
		>
			<div
				data-slot="progress-indicator"
				className={cx(
					"h-full rounded-full bg-accent transition-[width] duration-(--duration-normal) ease-standard motion-reduce:transition-none",
					!determinate && "w-2/5 animate-pulse motion-reduce:animate-none",
				)}
				style={determinate ? { width: `${ratio * 100}%` } : undefined}
			/>
		</div>
	);
}

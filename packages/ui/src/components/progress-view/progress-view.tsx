import { type HTMLAttributes, useRef } from "react";
import { useLiquidProgress } from "./use-liquid-progress";
import { cn } from "../../lib/class-names";
import { clampRange } from "../../lib/range-value";

export type ProgressViewSize = "sm" | "md" | "lg";

export interface ProgressViewProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
	label: string;
	/** Omit for an indeterminate operation. */
	value?: number;
	max?: number;
	size?: ProgressViewSize;
	/** Secondary text, such as bytes uploaded. */
	detail?: string;
}

const trackHeight: Record<ProgressViewSize, string> = {
	sm: "h-1",
	md: "h-2",
	lg: "h-3",
};

/** A determinate or indeterminate progress track respecting reduced motion. */
export function ProgressView({
	label,
	value,
	max = 100,
	size = "md",
	detail,
	className,
	...props
}: ProgressViewProps) {
	const limit = Number.isFinite(max) && max > 0 ? max : 100;
	const current = value === undefined ? undefined : clampRange(value, 0, limit);
	const progress = current === undefined ? undefined : (current / limit) * 100;
	const fill = useRef<HTMLDivElement>(null);
	useLiquidProgress(fill, progress);

	return (
		<div {...props} className={cn("flex min-w-0 flex-col gap-2", className)}>
			<div className="text-footnote flex items-center justify-between gap-3">
				<span className="text-label font-semibold">{label}</span>
				{detail && <span className="text-label-secondary">{detail}</span>}
			</div>
			<div
				role="progressbar"
				aria-label={label}
				aria-valuemin={current === undefined ? undefined : 0}
				aria-valuemax={current === undefined ? undefined : limit}
				aria-valuenow={current}
				className={cn(
					"bg-separator/70 relative w-full overflow-hidden rounded-full",
					trackHeight[size],
				)}
			>
				<div
					ref={fill}
					aria-hidden="true"
					className={cn(
						"bg-accent h-full rounded-full",
						current !== undefined && "passui-progress-fill",
						current === undefined &&
							"w-1/3 animate-pulse motion-reduce:animate-none",
					)}
					style={progress === undefined ? undefined : { width: `${progress}%` }}
				/>
			</div>
		</div>
	);
}

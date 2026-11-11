import type { ComponentProps } from "react";
import { cn } from "../../lib/class-names";

export type SkeletonSize = "sm" | "md" | "lg";

const minHeights: Record<SkeletonSize, string> = {
	sm: "min-h-3 rounded-md",
	md: "min-h-4 rounded-md",
	lg: "min-h-6 rounded-lg",
};

export interface SkeletonProps extends ComponentProps<"div"> {
	label?: string;
	/** Minimum height and rounding. @default "md" */
	size?: SkeletonSize;
}
/** A loading placeholder that becomes still when Reduce Motion is enabled. */
export function Skeleton({
	label,
	size = "md",
	className,
	...props
}: SkeletonProps) {
	return (
		<div
			{...props}
			role={label ? "status" : undefined}
			aria-hidden={label ? undefined : true}
			className={cn(
				"bg-fill motion-safe:animate-pulse",
				minHeights[size],
				className,
			)}
		>
			{label && <span className="sr-only">{label}</span>}
		</div>
	);
}

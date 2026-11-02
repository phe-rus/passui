import type { ComponentProps } from "react"
import { cn } from "../../lib/class-names"

export interface SkeletonProps extends ComponentProps<"div"> {
    label?: string
}
/** A loading placeholder that becomes still when Reduce Motion is enabled. */
export function Skeleton({ label, className, ...props }: SkeletonProps) {
    return (
        <div
            {...props}
            role={label ? "status" : undefined}
            aria-hidden={label ? undefined : true}
            className={cn("min-h-4 rounded-md bg-fill motion-safe:animate-pulse", className)}
        >
            {label && <span className="sr-only">{label}</span>}
        </div>
    )
}

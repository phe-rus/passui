import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "../../lib/class-names"

const dots = {
    saved: "bg-success",
    syncing: "bg-warning animate-pulse",
    offline: "bg-label-tertiary",
} as const

export type StatusIndicatorState = keyof typeof dots
export type StatusIndicatorSize = "sm" | "md"

const dotSizes: Record<StatusIndicatorSize, string> = {
    sm: "size-[6px]",
    md: "size-[7px]",
}

const textSizes: Record<StatusIndicatorSize, string> = {
    sm: "text-caption",
    md: "text-footnote",
}

export interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
    /** Visual treatment of the status dot. */
    state: StatusIndicatorState
    children: ReactNode
    /** Dot diameter and text scale. @default "md" */
    size?: StatusIndicatorSize
}

export function StatusIndicator({
    state,
    children,
    size = "md",
    className,
    ...props
}: StatusIndicatorProps) {
    return (
        <span
            className={cn(
                "flex items-center gap-1.5 text-label-tertiary",
                textSizes[size],
                className
            )}
            {...props}
        >
            <span aria-hidden="true" className={cn(dotSizes[size], "rounded-full", dots[state])} />
            {children}
        </span>
    )
}

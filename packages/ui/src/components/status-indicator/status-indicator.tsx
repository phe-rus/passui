import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "../../lib/class-names"

const dots = {
    saved: "bg-success",
    syncing: "bg-warning animate-pulse",
    offline: "bg-label-tertiary",
} as const

export type StatusIndicatorState = keyof typeof dots

export interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
    /** Visual treatment of the status dot. */
    state: StatusIndicatorState
    children: ReactNode
}

export function StatusIndicator({ state, children, className, ...props }: StatusIndicatorProps) {
    return (
        <span
            className={cn("flex items-center gap-1.5 text-footnote text-label-tertiary", className)}
            {...props}
        >
            <span aria-hidden="true" className={cn("size-[7px] rounded-full", dots[state])} />
            {children}
        </span>
    )
}

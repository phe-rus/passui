import { splitProps, type JSX } from "solid-js"
import { cn } from "../../lib/class-names"
const dots = {
    saved: "bg-success",
    syncing:
        "bg-warning animate-pulse motion-reduce:animate-none",
    offline: "bg-label-tertiary",
} as const
export interface StatusIndicatorProps
    extends JSX.HTMLAttributes<HTMLSpanElement> {
    state: keyof typeof dots
    className?: string
}
export function StatusIndicator(props: StatusIndicatorProps) {
    const [local, rest] = splitProps(props, [
        "state",
        "children",
        "class",
        "className",
    ])
    return (
        <span
            {...rest}
            class={cn(
                "flex items-center gap-1.5 text-footnote text-label-tertiary",
                local.class,
                local.className
            )}
        >
            <span
                aria-hidden="true"
                class={cn(
                    "size-[7px] rounded-full",
                    dots[local.state]
                )}
            />
            {local.children}
        </span>
    )
}

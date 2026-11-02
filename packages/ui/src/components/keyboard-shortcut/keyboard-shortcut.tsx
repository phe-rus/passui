import type { ComponentProps } from "react"
import { cn } from "../../lib/class-names"

export interface KeyboardShortcutProps extends ComponentProps<"kbd"> {}

/** A quiet keycap for a shortcut supplied and localized by the application. */
export function KeyboardShortcut({ className, ...props }: KeyboardShortcutProps) {
    return (
        <kbd
            {...props}
            className={cn(
                "inline-flex shrink-0 items-center rounded-md border border-separator/70 bg-fill/50 px-1.5 py-0.5 font-mono text-caption2 leading-none text-label-secondary",
                className
            )}
        />
    )
}

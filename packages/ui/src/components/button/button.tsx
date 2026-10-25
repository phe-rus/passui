import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "../../lib/class-names"
import { PendingSpinner } from "./pending-spinner"
import { usePendingIndicator } from "./use-pending-indicator"
import {
    buttonSizes,
    buttonVariants,
    type ButtonSize,
    type ButtonVariant,
} from "./button-styles"

export type { ButtonSize, ButtonVariant }

/**
 * Each variant has a little depth: a fine highlight along the top edge and
 * a soft, layered shadow, like a well-made physical key.
 */
export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    isPending?: boolean
}

/** Shares native button appearance with semantic links without nesting a button. */
export function buttonStyle({
    variant = "default",
    size = "default",
    className,
}: Pick<ButtonProps, "variant" | "size" | "className"> = {}) {
    return cn(
        "group relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-[-0.005em]",
        "transition-[background-color,filter,transform,box-shadow] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]",
        "motion-reduce:transform-none motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        buttonSizes[size],
        buttonVariants[variant],
        className
    )
}

export const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
>(function Button(
    {
        variant = "default",
        size = "default",
        isPending = false,
        disabled,
        children,
        className,
        type = "button",
        ...props
    },
    ref
) {
    const showPendingIndicator =
        usePendingIndicator(isPending)

    return (
        <button
            ref={ref}
            type={type}
            className={buttonStyle({
                variant,
                size,
                // pending is busy, not unavailable: keep full colour
                className: cn(
                    "data-pending:cursor-progress data-pending:disabled:opacity-100",
                    className
                ),
            })}
            {...props}
            data-pending={isPending || undefined}
            disabled={disabled || isPending}
            aria-busy={isPending || props["aria-busy"]}
        >
            {/* the label keeps its space, so the width never jumps */}
            <span
                className={cn(
                    "inline-flex items-center justify-center gap-2 transition-opacity duration-200",
                    showPendingIndicator && "opacity-0"
                )}
            >
                {children}
            </span>
            {showPendingIndicator && <PendingSpinner />}
        </button>
    )
})

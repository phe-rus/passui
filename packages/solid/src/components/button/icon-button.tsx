/** @jsxImportSource solid-js */
import {
    mergeProps,
    Show,
    splitProps,
    type JSX,
} from "solid-js"
import { cn } from "../../lib/class-names"
import { PendingSpinner } from "./button"
import {
    buttonVariants,
    iconButtonSizes,
    type ButtonVariant,
    type IconButtonSize,
} from "./button-styles"
import { usePendingIndicator } from "./use-pending-indicator"

export type { IconButtonSize }
export interface IconButtonProps
    extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    variant?: ButtonVariant
    size?: IconButtonSize
    isPending?: boolean
    className?: string
}

export function IconButton(props: IconButtonProps) {
    const [local, rest] = splitProps(
        mergeProps(
            {
                type: "button" as const,
                size: "icon" as const,
                variant: "default" as const,
            },
            props
        ),
        [
            "label",
            "variant",
            "size",
            "isPending",
            "disabled",
            "children",
            "class",
            "className",
            "type",
            "aria-busy",
        ]
    )
    const visible = usePendingIndicator(
        () => local.isPending ?? false
    )
    return (
        <button
            {...rest}
            type={local.type}
            aria-label={local.label}
            data-tooltip={local.label}
            class={cn(
                "group relative inline-flex shrink-0 items-center justify-center rounded-full transition-[background-color,filter,transform,box-shadow] duration-fast ease-standard active:scale-[0.92] disabled:pointer-events-none disabled:opacity-40 data-pending:cursor-progress data-pending:disabled:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                iconButtonSizes[local.size],
                buttonVariants[local.variant],
                local.class,
                local.className
            )}
            data-pending={local.isPending || undefined}
            disabled={local.disabled || local.isPending}
            aria-busy={local.isPending || local["aria-busy"]}
        >
            <span
                class={cn(
                    "inline-flex items-center justify-center transition-opacity duration-200",
                    visible() && "opacity-0"
                )}
            >
                {local.children}
            </span>
            <Show when={visible()}>
                <PendingSpinner />
            </Show>
        </button>
    )
}

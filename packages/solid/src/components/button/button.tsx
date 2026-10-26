import {
    mergeProps,
    Show,
    splitProps,
    type JSX,
} from "solid-js"
import { cn } from "../../lib/class-names"
import {
    buttonSizes,
    buttonVariants,
    type ButtonSize,
    type ButtonVariant,
} from "./button-styles"
import { usePendingIndicator } from "./use-pending-indicator"

export type { ButtonSize, ButtonVariant }
export interface ButtonProps
    extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    isPending?: boolean
    className?: string
}

export function buttonStyle(
    props: Pick<
        ButtonProps,
        "variant" | "size" | "className" | "class"
    > = {}
) {
    return cn(
        "group relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-[-0.005em]",
        "transition-[background-color,filter,transform,box-shadow] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]",
        "motion-reduce:transform-none motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        buttonSizes[props.size ?? "default"],
        buttonVariants[props.variant ?? "default"],
        props.class,
        props.className
    )
}

export function PendingSpinner() {
    return (
        <span
            aria-hidden="true"
            class="absolute inset-0 flex animate-in items-center justify-center fade-in zoom-in-75 duration-200 motion-reduce:animate-none"
        >
            <span class="size-[1.1em] animate-spin rounded-full border-2 border-current/25 border-t-current motion-reduce:animate-none" />
        </span>
    )
}

export function Button(props: ButtonProps) {
    const [local, rest] = splitProps(
        mergeProps({ type: "button" as const }, props),
        [
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
            class={cn(
                buttonStyle(local),
                "data-pending:cursor-progress data-pending:disabled:opacity-100"
            )}
            data-pending={local.isPending || undefined}
            disabled={local.disabled || local.isPending}
            aria-busy={local.isPending || local["aria-busy"]}
        >
            <span
                class={cn(
                    "inline-flex items-center justify-center gap-2 transition-opacity duration-200",
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

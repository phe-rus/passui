/** @jsxImportSource solid-js */
import type { JSX } from "solid-js"
import { cn } from "@passui/solid/cn"
export function FormAlert(props: {
    children: JSX.Element
    className?: string
}) {
    return (
        <div
            role="alert"
            class={cn(
                "flex items-start gap-2.5 rounded-2xl bg-danger/12 px-4 py-3 text-subheadline font-medium text-danger ring-1 ring-danger/25 motion-safe:animate-in motion-safe:fade-in-0",
                props.className
            )}
        >
            <span class="min-w-0">{props.children}</span>
        </div>
    )
}

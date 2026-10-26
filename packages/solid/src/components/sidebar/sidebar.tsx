/** @jsxImportSource solid-js */
import { Show, type JSX } from "solid-js"
import { cn } from "../../lib/class-names"
export function SidebarSection(props: {
    title: string
    children: JSX.Element
}) {
    return (
        <div class="flex flex-col gap-0.5">
            <span class="px-2.5 pb-1.5 text-caption font-semibold text-label-tertiary">
                {props.title}
            </span>
            {props.children}
        </div>
    )
}
export function sidebarItemClass(active?: boolean) {
    return cn(
        "group flex items-center gap-2.5 rounded-2xl px-2.5 py-[7px] text-subheadline text-label no-underline transition-colors duration-fast",
        active
            ? "bg-accent-soft font-medium text-label"
            : "hover:bg-fill/70"
    )
}
export function SidebarItemContent(props: {
    icon: JSX.Element
    count?: number
    active?: boolean
    children: JSX.Element
}) {
    return (
        <>
            <span
                class={cn(
                    "flex transition-colors",
                    props.active
                        ? "text-accent-text"
                        : "text-label-secondary"
                )}
            >
                {props.icon}
            </span>
            <span class="grow truncate">
                {props.children}
            </span>
            <Show when={props.count !== undefined}>
                <span
                    class={cn(
                        "text-footnote tabular-nums",
                        props.active
                            ? "text-accent-text"
                            : "text-label-tertiary"
                    )}
                >
                    {props.count}
                </span>
            </Show>
        </>
    )
}

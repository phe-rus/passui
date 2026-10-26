/** @jsxImportSource solid-js */
import {
    createSignal,
    onCleanup,
    Show,
    type JSX,
} from "solid-js"
import { Dynamic } from "solid-js/web"
import { Link, type LinkProps } from "@tanstack/solid-router"
import { cn } from "@passui/solid/cn"
import {
    IconButton,
    type IconButtonSize,
} from "@passui/solid/icon-button"
function Row(props: {
    icon?: JSX.Element
    title: JSX.Element
    description?: JSX.Element
    value?: JSX.Element
    trailing?: JSX.Element
    to?: LinkProps["to"]
    params?: LinkProps["params"]
    hash?: string
    onClick?: () => void
    chevron?: boolean
    tone?: "default" | "destructive"
}) {
    const style = () =>
        cn(
            "setting-row flex min-h-10 w-full items-center gap-3 px-3.5 py-1.5 text-start",
            (props.to || props.onClick) &&
                "cursor-pointer hover:bg-fill focus-visible:bg-fill",
            props.tone === "destructive" &&
                "[&_h3]:text-danger"
        )
    const body = () => (
        <>
            {props.icon}
            <span class="flex min-w-0 flex-1 flex-col">
                <h3 class="truncate text-subheadline">
                    {props.title}
                </h3>
                <Show when={props.description}>
                    <p class="text-footnote text-label-secondary">
                        {props.description}
                    </p>
                </Show>
            </span>
            <Show when={props.value}>
                <span class="max-w-[45%] truncate text-subheadline text-label-secondary">
                    {props.value}
                </span>
            </Show>
            {props.trailing}
            <Show
                when={
                    props.chevron ??
                    Boolean(props.to || props.onClick)
                }
            >
                <span
                    aria-hidden="true"
                    class="text-label-tertiary"
                >
                    ›
                </span>
            </Show>
        </>
    )
    return (
        <Show
            when={props.to}
            fallback={
                <Dynamic
                    component={
                        props.onClick ? "button" : "div"
                    }
                    type={
                        props.onClick ? "button" : undefined
                    }
                    onClick={() => props.onClick?.()}
                    class={style()}
                >
                    {body()}
                </Dynamic>
            }
        >
            <Link
                to={props.to}
                params={props.params}
                hash={props.hash}
                class={style()}
            >
                {body()}
            </Link>
        </Show>
    )
}
function Copy(props: {
    value: string
    label?: string
    size?: IconButtonSize
}) {
    const [copied, setCopied] = createSignal(false)
    let timer: ReturnType<typeof setTimeout> | undefined
    onCleanup(() => clearTimeout(timer))
    return (
        <IconButton
            variant="ghost"
            size={props.size ?? "icon-xs"}
            label={props.label ?? "Copy"}
            onClick={async (event) => {
                event.stopPropagation()
                await navigator.clipboard.writeText(
                    props.value
                )
                setCopied(true)
                clearTimeout(timer)
                timer = setTimeout(
                    () => setCopied(false),
                    1500
                )
            }}
        >
            <span aria-hidden="true">
                {copied() ? "✓" : "⧉"}
            </span>
        </IconButton>
    )
}
export const SettingList = Object.assign(
    function SettingList(props: {
        id?: string
        as?: "h2" | "h3"
        icon?: JSX.Element
        title?: string
        description?: string
        action?: JSX.Element
        variant?: "inset" | "tile"
        children: JSX.Element
        className?: string
    }) {
        return (
            <section
                id={props.id}
                class={cn(
                    "flex scroll-mt-20 flex-col gap-3 [&_.setting-row]:min-h-16 [&_.setting-row]:px-4 [&_.setting-row]:py-3",
                    props.variant === "tile" &&
                        "overflow-hidden rounded-3xl border border-separator/70 bg-elevated shadow-sm",
                    props.className
                )}
            >
                <Show when={props.title}>
                    <div
                        class={cn(
                            "flex items-start gap-3",
                            props.variant === "tile" &&
                                "border-b border-separator/60 px-4 py-4"
                        )}
                    >
                        {props.icon}
                        <div class="min-w-0 flex-1">
                            <Dynamic
                                component={props.as ?? "h2"}
                                class="text-subheadline font-semibold"
                            >
                                {props.title}
                            </Dynamic>
                            <Show when={props.description}>
                                <p class="text-footnote text-label-secondary">
                                    {props.description}
                                </p>
                            </Show>
                        </div>
                        {props.action}
                    </div>
                </Show>
                <div class="flex flex-col overflow-hidden rounded-2xl border border-separator/35 bg-elevated [&>*+*]:border-t [&>*+*]:border-separator/40">
                    {props.children}
                </div>
            </section>
        )
    },
    { Row, Copy }
)

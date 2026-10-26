/** @jsxImportSource solid-js */
import {
    createSignal,
    onMount,
    onCleanup,
    Show,
    splitProps,
    type JSX,
} from "solid-js"
import { screenEdges } from "../../lib/screen-edges"
import { cn } from "../../lib/class-names"
export type PopoverOrigin = "top-left" | "top-right"
export type PopoverProps =
    JSX.HTMLAttributes<HTMLDivElement> & {
        open: boolean
        origin?: PopoverOrigin
        className?: string
    }
export function Popover(props: PopoverProps) {
    return (
        <Show when={props.open}>
            <OpenPopover {...props} />
        </Show>
    )
}
function OpenPopover(props: PopoverProps) {
    const [local, rest] = splitProps(props, [
        "open",
        "origin",
        "style",
        "class",
        "className",
    ])
    const [placementStyle, setPlacementStyle] =
        createSignal<JSX.CSSProperties>({})
    let root!: HTMLDivElement
    onMount(() => {
        function refit() {
            root.style.translate = "none"
            const rect = root.getBoundingClientRect(),
                edges = screenEdges()
            const viewport = window.visualViewport
            const left =
                    (viewport?.offsetLeft ?? 0) + edges.left,
                right =
                    (viewport?.offsetLeft ?? 0) +
                    (viewport?.width ?? window.innerWidth) -
                    edges.right
            const bottom =
                (viewport?.offsetTop ?? 0) +
                (viewport?.height ?? window.innerHeight) -
                edges.bottom
            const shift = Math.max(
                left - rect.left,
                Math.min(0, right - rect.right)
            )
            setPlacementStyle({
                translate: `${shift}px 0`,
                "max-width": `${Math.max(0, right - left)}px`,
                "max-height": `${Math.max(0, bottom - rect.top)}px`,
                "overflow-y": "auto",
            })
        }
        refit()
        const viewport = window.visualViewport
        viewport?.addEventListener("resize", refit)
        viewport?.addEventListener("scroll", refit)
        window.addEventListener("resize", refit)
        window.addEventListener("scroll", refit, true)
        onCleanup(() => {
            viewport?.removeEventListener("resize", refit)
            viewport?.removeEventListener("scroll", refit)
            window.removeEventListener("resize", refit)
            window.removeEventListener("scroll", refit, true)
        })
    })
    return (
        <div
            {...rest}
            ref={root}
            style={{
                "transform-origin":
                    local.origin === "top-right"
                        ? "100% 0%"
                        : "0% 0%",
                ...placementStyle(),
                ...(typeof local.style === "object"
                    ? local.style
                    : {}),
            }}
            class={cn(
                "glass-menu absolute z-40 rounded-5xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95",
                local.class,
                local.className
            )}
        />
    )
}

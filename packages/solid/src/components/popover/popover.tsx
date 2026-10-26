import {
    createEffect,
    createSignal,
    onMount,
    onCleanup,
    Show,
    splitProps,
    type JSX,
} from "solid-js"
import { springs } from "@passui/tokens/motion"
import { useSpringValue } from "../../hooks/use-spring-value"
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
    const [rendered, setRendered] = createSignal(props.open)
    createEffect(() => {
        if (props.open) setRendered(true)
        else {
            const timer = setTimeout(
                () => setRendered(false),
                250
            )
            onCleanup(() => clearTimeout(timer))
        }
    })
    return (
        <Show when={rendered()}>
            <OpenPopover {...props} />
        </Show>
    )
}
function OpenPopover(props: PopoverProps) {
    const opacity = useSpringValue(0, springs.snappy)
    const scale = useSpringValue(0.94, springs.snappy)
    const offset = useSpringValue(-6, springs.snappy)
    createEffect(() => {
        opacity.to(props.open ? 1 : 0)
        scale.to(props.open ? 1 : 0.96)
        offset.to(props.open ? 0 : -4)
    })
    onMount(() => {
        if (!props.open) return
        opacity.jump(0)
        scale.jump(0.94)
        offset.jump(-6)
        opacity.to(1)
        scale.to(1)
        offset.to(0)
    })
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
                opacity: opacity.value(),
                transform: `translateY(${offset.value()}px) scale(${scale.value()})`,
                ...placementStyle(),
                ...(typeof local.style === "object"
                    ? local.style
                    : {}),
            }}
            class={cn(
                "glass-menu absolute z-40 rounded-5xl",
                local.class,
                local.className
            )}
        />
    )
}

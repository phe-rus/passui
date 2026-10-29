import {
    createEffect,
    createSignal,
    onCleanup,
    onMount,
    type JSX,
} from "solid-js"
import { springs } from "@passui/tokens/motion"
import { cn } from "../../lib/class-names"
import { useSpringValue } from "../../hooks/use-spring-value"

export interface InlineDisclosureProps {
    open: boolean
    children: JSX.Element
    class?: string
    className?: string
}

/** Keeps its content mounted while springing the surrounding layout open or closed. */
export function InlineDisclosure(
    props: InlineDisclosureProps
) {
    const [contentHeight, setContentHeight] = createSignal(0)
    const [ready, setReady] = createSignal(false)
    const height = useSpringValue(0, springs.smooth)
    const opacity = useSpringValue(0, springs.smooth)
    let content!: HTMLDivElement

    createEffect(() => {
        height.to(props.open ? contentHeight() : 0)
        opacity.to(props.open ? 1 : 0)
    })

    onMount(() => {
        const measure = () =>
            setContentHeight(content.scrollHeight)
        measure()
        height.jump(props.open ? content.scrollHeight : 0)
        opacity.jump(props.open ? 1 : 0)
        setReady(true)
        const observer = new ResizeObserver(measure)
        observer.observe(content)
        onCleanup(() => observer.disconnect())
    })

    return (
        <div
            class={cn(
                "overflow-hidden",
                props.class,
                props.className
            )}
            style={{
                height:
                    !ready() && props.open
                        ? "auto"
                        : `${height.value()}px`,
                opacity:
                    !ready() && props.open
                        ? 1
                        : opacity.value(),
            }}
            aria-hidden={!props.open}
            inert={!props.open}
        >
            <div ref={content}>{props.children}</div>
        </div>
    )
}

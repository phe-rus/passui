import { createSignal, onMount, onCleanup } from "solid-js"
import { minimizeDecision } from "./scroll/minimize-decision"

/**
 * Minimized while you scroll down through content, restored when you scroll
 * back up or reach the top: iOS 26's `tabBarMinimizeBehavior(.onScrollDown)`.
 * Listens to every scroll container, since each screen scrolls its own pane.
 */
export function useMinimizeOnScroll() {
    const [minimized, setMinimized] = createSignal(false)
    onMount(() => {
        const anchors = new WeakMap<Element, number>()
        let intent: number | null = null
        const onIntent = () => {
            intent = performance.now()
        }
        const onKey = (event: KeyboardEvent) => {
            if (
                [
                    "ArrowDown",
                    "ArrowUp",
                    "PageDown",
                    "PageUp",
                    "Home",
                    "End",
                    " ",
                ].includes(event.key)
            )
                onIntent()
        }
        const onPointer = (event: PointerEvent) => {
            if (event.buttons === 1) onIntent()
        }
        const onScroll = (event: Event) => {
            const pane =
                event.target instanceof Element
                    ? event.target
                    : document.scrollingElement
            if (
                !pane ||
                pane.closest(
                    "[role=dialog], [data-floating-layer]"
                ) ||
                pane.scrollHeight <= pane.clientHeight + 1
            )
                return
            const top = pane.scrollTop
            const userDriven =
                intent !== null &&
                performance.now() - intent < 2000
            const anchor = anchors.get(pane) ?? 0
            const next = minimizeDecision(
                top,
                anchor,
                userDriven
            )
            if (next !== null) setMinimized(next)
            if (next !== null || !userDriven)
                anchors.set(pane, top)
        }
        document.addEventListener("touchmove", onIntent, {
            passive: true,
        })
        document.addEventListener("wheel", onIntent, {
            passive: true,
        })
        document.addEventListener("pointermove", onPointer, {
            passive: true,
        })
        document.addEventListener("keydown", onKey)
        document.addEventListener("scroll", onScroll, {
            capture: true,
            passive: true,
        })
        onCleanup(() => {
            document.removeEventListener("scroll", onScroll, {
                capture: true,
            })
            document.removeEventListener(
                "touchmove",
                onIntent
            )
            document.removeEventListener("wheel", onIntent)
            document.removeEventListener(
                "pointermove",
                onPointer
            )
            document.removeEventListener("keydown", onKey)
        })
    })
    return [minimized, setMinimized] as const
}

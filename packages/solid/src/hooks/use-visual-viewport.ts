import {
    createSignal,
    onMount,
    onCleanup,
    type Accessor,
} from "solid-js"
import { viewportMetrics } from "./viewport/viewport-metrics"
import type { ViewportMetrics } from "./viewport/types"
export type { ViewportMetrics } from "./viewport/types"

/** Measures once per frame, including Android resize and Safari viewport panning. */
export function useVisualViewport(): Accessor<ViewportMetrics | null> {
    const [metrics, setMetrics] =
        createSignal<ViewportMetrics | null>(null)
    onMount(() => {
        const viewport = window.visualViewport
        let baseline = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
        let frame = 0
        const measure = () => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => {
                const active = document.activeElement
                const editing = !!active?.matches(
                    "input:not([type=button]):not([type=checkbox]):not([type=radio]), textarea, [contenteditable=true]"
                )
                const width =
                    viewport?.width ?? window.innerWidth
                const height =
                    viewport?.height ?? window.innerHeight
                if (
                    Math.abs(baseline.width - width) > 80 ||
                    !editing
                )
                    baseline = {
                        width,
                        height: window.innerHeight,
                    }
                const next = viewportMetrics(
                    {
                        width,
                        height,
                        layoutHeight: window.innerHeight,
                        top: viewport?.offsetTop ?? 0,
                        left: viewport?.offsetLeft ?? 0,
                        editing,
                    },
                    baseline
                )
                setMetrics((previous) =>
                    previous &&
                    Object.entries(next).every(
                        ([key, value]) =>
                            previous[
                                key as keyof ViewportMetrics
                            ] === value
                    )
                        ? previous
                        : next
                )
            })
        }
        measure()
        viewport?.addEventListener("resize", measure)
        viewport?.addEventListener("scroll", measure)
        window.addEventListener("resize", measure)
        document.addEventListener("focusin", measure)
        document.addEventListener("focusout", measure)
        onCleanup(() => {
            cancelAnimationFrame(frame)
            viewport?.removeEventListener("resize", measure)
            viewport?.removeEventListener("scroll", measure)
            window.removeEventListener("resize", measure)
            document.removeEventListener("focusin", measure)
            document.removeEventListener("focusout", measure)
        })
    })
    return metrics
}

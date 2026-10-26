/** @jsxImportSource solid-js */
import {
    createSignal,
    onMount,
    onCleanup,
    Show,
} from "solid-js"
import { Portal } from "solid-js/web"
interface Tip {
    text: string
    x: number
    y: number
    /** Shown above the element when there's no room below. */
    above: boolean
}

const DELAY = 450
/** Moving from one control to the next within this window shows at once. */
const WARM_WINDOW = 600
const MARGIN = 8

/**
 * Tooltips for any element with `data-tooltip`, on devices that can hover.
 * One listener for the whole app: a short delay before the first, then
 * instant while moving between controls, as on macOS.
 */
export function TooltipHost() {
    const [tip, setTip] = createSignal<Tip | null>(null)

    onMount(() => {
        if (
            !window.matchMedia(
                "(hover: hover) and (pointer: fine)"
            ).matches
        )
            return
        let timer: ReturnType<typeof setTimeout> | undefined
        let current: Element | null = null
        let lastShown = 0

        const show = (element: Element) => {
            const text = element.getAttribute("data-tooltip")
            if (!text) return
            const rect = element.getBoundingClientRect()
            const above =
                rect.bottom + 40 > window.innerHeight
            setTip({
                text,
                x: rect.left + rect.width / 2,
                y: above
                    ? rect.top - MARGIN
                    : rect.bottom + MARGIN,
                above,
            })
            lastShown = Date.now()
        }
        const hide = () => {
            clearTimeout(timer)
            if (current) lastShown = Date.now()
            current = null
            setTip(null)
        }
        const onOver = (event: PointerEvent) => {
            const element =
                (event.target as Element | null)?.closest?.(
                    "[data-tooltip]"
                ) ?? null
            if (element === current) return
            clearTimeout(timer)
            current = element
            if (!element) {
                setTip(null)
                return
            }
            const warm = Date.now() - lastShown < WARM_WINDOW
            if (warm) show(element)
            else {
                setTip(null)
                timer = setTimeout(
                    () =>
                        current === element && show(element),
                    DELAY
                )
            }
        }

        window.document.addEventListener(
            "pointerover",
            onOver
        )
        window.document.addEventListener(
            "pointerdown",
            hide,
            true
        )
        window.document.addEventListener(
            "keydown",
            hide,
            true
        )
        window.addEventListener("scroll", hide, true)
        window.addEventListener("blur", hide)
        onCleanup(() => {
            clearTimeout(timer)
            window.document.removeEventListener(
                "pointerover",
                onOver
            )
            window.document.removeEventListener(
                "pointerdown",
                hide,
                true
            )
            window.document.removeEventListener(
                "keydown",
                hide,
                true
            )
            window.removeEventListener("scroll", hide, true)
            window.removeEventListener("blur", hide)
        })
    })

    return (
        <Show when={tip()}>
            {(value) => (
                <Portal>
                    <div
                        role="tooltip"
                        class="pointer-events-none fixed z-[80] max-w-[240px] rounded-md bg-inverse px-2.5 py-1.5 text-center text-caption leading-tight font-medium text-on-inverse shadow-lg motion-safe:animate-in motion-safe:fade-in-0"
                        style={{
                            left: `${Math.min(Math.max(value().x, 128), window.innerWidth - 128)}px`,
                            top: `${value().y}px`,
                            transform: `translate(-50%, ${value().above ? "-100%" : "0"})`,
                        }}
                    >
                        {value().text}
                    </div>
                </Portal>
            )}
        </Show>
    )
}

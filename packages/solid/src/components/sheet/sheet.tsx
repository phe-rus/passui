import {
    createEffect,
    createSignal,
    onCleanup,
    onMount,
    Show,
    type JSX,
} from "solid-js"
import { springs } from "@passui/tokens/motion"
import { cn } from "../../lib/class-names"
import { useSpringValue } from "../../hooks/use-spring-value"
import { useVisualViewport } from "../../hooks/use-visual-viewport"
import { SheetPortal } from "./sheet-portal"
import { useSheetFocus } from "./use-sheet-focus"
export interface SheetProps {
    open: boolean
    onClose: () => void
    label: string
    labelledBy?: string
    describedBy?: string
    role?: "dialog" | "alertdialog"
    className?: string
    class?: string
    children: JSX.Element
}
export function Sheet(props: SheetProps) {
    const [rendered, setRendered] = createSignal(props.open)
    createEffect(() => {
        if (props.open) setRendered(true)
        else {
            const timer = setTimeout(
                () => setRendered(false),
                300
            )
            onCleanup(() => clearTimeout(timer))
        }
    })
    return (
        <Show when={rendered()}>
            <SheetPortal>
                <OpenSheet {...props} />
            </SheetPortal>
        </Show>
    )
}
function OpenSheet(props: SheetProps) {
    const opacity = useSpringValue(0, springs.smooth)
    const panelOpacity = useSpringValue(0, springs.snappy)
    const offset = useSpringValue(40, springs.smooth)
    const scale = useSpringValue(0.98, springs.smooth)
    createEffect(() => {
        opacity.to(props.open ? 1 : 0)
        panelOpacity.to(props.open ? 1 : 0)
        offset.to(props.open ? 0 : 30)
        scale.to(props.open ? 1 : 0.98)
    })
    onMount(() => {
        if (!props.open) return
        opacity.jump(0)
        panelOpacity.jump(0)
        offset.jump(40)
        scale.jump(0.98)
        opacity.to(1)
        panelOpacity.to(1)
        offset.to(0)
        scale.to(1)
    })
    let panel: HTMLDivElement | undefined
    const viewport = useVisualViewport()
    useSheetFocus(
        () => panel,
        () => props.onClose()
    )
    return (
        <div
            class="fixed inset-0 z-[65] flex items-end justify-center sm:items-center sm:p-6"
            style={
                viewport()
                    ? {
                          top: `${viewport()!.top}px`,
                          left: `${viewport()!.left}px`,
                          width: `${viewport()!.width}px`,
                          height: `${viewport()!.height}px`,
                          bottom: "auto",
                          right: "auto",
                      }
                    : undefined
            }
        >
            <div
                aria-hidden="true"
                class="absolute inset-0 bg-black/30 backdrop-blur-md"
                style={{ opacity: opacity.value() }}
                onClick={() => props.onClose()}
            />
            {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: both allowed roles, dialog and alertdialog, support aria-modal. */}
            <div
                ref={panel}
                role={props.role ?? "dialog"}
                aria-modal="true"
                aria-label={
                    props.labelledBy ? undefined : props.label
                }
                aria-labelledby={props.labelledBy}
                aria-describedby={props.describedBy}
                tabIndex={-1}
                class={cn(
                    "glass-menu relative flex w-full flex-col overflow-hidden max-h-[92%] max-w-[560px] rounded-t-sheet sm:rounded-sheet",
                    props.class,
                    props.className
                )}
                style={{
                    opacity: panelOpacity.value(),
                    transform: `translateY(${offset.value()}px) scale(${scale.value()})`,
                }}
            >
                {props.children}
            </div>
        </div>
    )
}

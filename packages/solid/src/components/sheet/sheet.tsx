import { Show, type JSX } from "solid-js"
import { cn } from "../../lib/class-names"
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
    return (
        <Show when={props.open}>
            <SheetPortal>
                <OpenSheet {...props} />
            </SheetPortal>
        </Show>
    )
}
function OpenSheet(props: SheetProps) {
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
                class="absolute inset-0 bg-black/30 backdrop-blur-md motion-safe:animate-in motion-safe:fade-in-0"
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
                    "glass-menu relative flex w-full flex-col overflow-hidden max-h-[92%] max-w-[560px] rounded-t-sheet sm:rounded-sheet motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4",
                    props.class,
                    props.className
                )}
            >
                {props.children}
            </div>
        </div>
    )
}

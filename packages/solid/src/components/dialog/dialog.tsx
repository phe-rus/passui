import {
    createContext,
    createUniqueId,
    Show,
    useContext,
    type JSX,
} from "solid-js"
import { Dynamic } from "solid-js/web"
import { Sheet } from "../sheet/sheet"
import { Button } from "../button/button"
import { cn } from "../../lib/class-names"
const CloseContext = createContext<() => void>(() => {})
export type DialogPresentation =
    | "drawer"
    | "center"
    | "inline"
export type DialogTone = "default" | "destructive"
export interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: JSX.Element
    description?: JSX.Element
    children?: JSX.Element
    footer?: JSX.Element
    presentation?: DialogPresentation
    className?: string
    onSubmit?: JSX.EventHandler<HTMLFormElement, SubmitEvent>
}
export const Dialog = Object.assign(
    function Dialog(props: DialogProps) {
        const id = createUniqueId(),
            descriptionId = `${id}-description`
        const body = () => (
            <CloseContext.Provider
                value={() => props.onOpenChange(false)}
            >
                <Dynamic
                    component={
                        props.onSubmit ? "form" : "div"
                    }
                    onSubmit={props.onSubmit}
                    class={cn(
                        "flex min-h-0 flex-col gap-4 overflow-y-auto p-5",
                        props.className
                    )}
                >
                    <Show
                        when={props.presentation !== "inline"}
                    >
                        <h2
                            id={id}
                            class="text-title3 font-semibold"
                        >
                            {props.title}
                        </h2>
                    </Show>
                    <Show when={props.description}>
                        <p
                            id={descriptionId}
                            class="text-footnote text-label-secondary"
                        >
                            {props.description}
                        </p>
                    </Show>
                    <div class="flex flex-col gap-4">
                        {props.children}
                    </div>
                    <Show when={props.footer}>
                        <div class="flex flex-wrap justify-end gap-2 pt-3">
                            {props.footer}
                        </div>
                    </Show>
                </Dynamic>
            </CloseContext.Provider>
        )
        return (
            <Show
                when={props.presentation !== "inline"}
                fallback={
                    <Show when={props.open}>{body()}</Show>
                }
            >
                <Sheet
                    open={props.open}
                    onClose={() => props.onOpenChange(false)}
                    label=""
                    labelledBy={id}
                    describedBy={
                        props.description
                            ? descriptionId
                            : undefined
                    }
                >
                    {body()}
                </Sheet>
            </Show>
        )
    },
    { Actions }
)
function Actions(props: {
    submitLabel: JSX.Element
    cancelLabel: JSX.Element
    pending?: boolean
    disabled?: boolean
    tone?: DialogTone
    onConfirm?: () => void
}) {
    const close = useContext(CloseContext)
    return (
        <>
            <Button
                type={props.onConfirm ? "button" : "submit"}
                variant={
                    props.tone === "destructive"
                        ? "ghost"
                        : "default"
                }
                class={
                    props.tone === "destructive"
                        ? "bg-danger/10 text-danger"
                        : undefined
                }
                isPending={props.pending}
                disabled={props.disabled}
                onClick={() => props.onConfirm?.()}
            >
                {props.submitLabel}
            </Button>
            <Button
                type="button"
                variant="secondary"
                onClick={close}
            >
                {props.cancelLabel}
            </Button>
        </>
    )
}

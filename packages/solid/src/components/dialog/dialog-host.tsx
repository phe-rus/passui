import {
    createSignal,
    onMount,
    onCleanup,
    Show,
} from "solid-js"
import { Sheet } from "../sheet/sheet"
import { Button } from "../button/button"
import {
    getDialog,
    settleDialog,
    subscribeDialogs,
    type PendingDialog,
} from "./dialog-store"
export function DialogHost() {
    const [dialog, setDialog] =
        createSignal<PendingDialog | null>(null)
    onMount(() => {
        setDialog(getDialog())
        onCleanup(
            subscribeDialogs(() => setDialog(getDialog()))
        )
    })
    return (
        <Show when={dialog()} keyed>
            {(item) => (
                <Sheet
                    open
                    label=""
                    role="alertdialog"
                    labelledBy={`confirm-${item.id}`}
                    describedBy={
                        item.message
                            ? `confirm-message-${item.id}`
                            : undefined
                    }
                    onClose={() => settleDialog(false)}
                    class="max-w-[340px]"
                >
                    <div class="flex flex-col gap-4 p-5 text-center">
                        <h2
                            id={`confirm-${item.id}`}
                            class="text-body font-semibold"
                        >
                            {item.title}
                        </h2>
                        <Show when={item.message}>
                            <p
                                id={`confirm-message-${item.id}`}
                                class="text-subheadline text-label-secondary"
                            >
                                {item.message}
                            </p>
                        </Show>
                        <div class="flex gap-2.5">
                            <Button
                                autofocus={item.destructive}
                                variant="secondary"
                                onClick={() =>
                                    settleDialog(false)
                                }
                            >
                                {item.cancelLabel ?? "Cancel"}
                            </Button>
                            <Button
                                autofocus={!item.destructive}
                                variant={
                                    item.destructive
                                        ? "destructive"
                                        : "default"
                                }
                                onClick={() =>
                                    settleDialog(true)
                                }
                            >
                                {item.confirmLabel ?? "OK"}
                            </Button>
                        </div>
                    </div>
                </Sheet>
            )}
        </Show>
    )
}
export * from "./dialog-store"

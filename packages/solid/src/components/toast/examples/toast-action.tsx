import { createSignal } from "solid-js"
import { toast } from "@passui/solid/toast"
import { Toaster } from "@passui/solid/toaster"
import { Button } from "@passui/solid/button"

export function ToastAction() {
    const [archived, setArchived] = createSignal(0)
    return (
        <div class="flex flex-col items-center gap-3">
            <Button
                variant="secondary"
                onClick={() => {
                    setArchived((count) => count + 1)
                    toast("Note archived", {
                        action: {
                            label: "Undo",
                            onClick: () =>
                                setArchived(
                                    (count) => count - 1
                                ),
                        },
                    })
                }}
            >
                Archive note
            </Button>
            <p class="text-footnote text-label-secondary">
                Archived: {archived()}
            </p>
            <Toaster />
        </div>
    )
}

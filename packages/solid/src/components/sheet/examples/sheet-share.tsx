import { createSignal } from "solid-js"
import { Sheet } from "@passui/solid/sheet"
import { Button } from "@passui/solid/button"
import { Toggle } from "@passui/solid/toggle"
import { toast } from "@passui/solid/toast"

export function SheetShare() {
    const [open, setOpen] = createSignal(false)
    const [canEdit, setCanEdit] = createSignal(false)
    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Share
            </Button>
            <Sheet
                open={open()}
                onClose={() => setOpen(false)}
                label="Share note"
            >
                <div class="flex flex-col gap-5 p-6">
                    <h2 class="text-title3 font-semibold text-label">
                        Share note
                    </h2>
                    <Toggle
                        label="People with the link can edit"
                        checked={canEdit()}
                        onChange={setCanEdit}
                    />
                    <div class="flex justify-end gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="accent"
                            onClick={() => {
                                setOpen(false)
                                toast.success("Link copied")
                            }}
                        >
                            Copy link
                        </Button>
                    </div>
                </div>
            </Sheet>
        </>
    )
}

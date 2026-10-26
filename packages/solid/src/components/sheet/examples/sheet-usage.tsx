/** @jsxImportSource solid-js */
import { createSignal } from "solid-js"
import { Sheet } from "@passui/solid/sheet"
export function SheetUsage() {
    const [open, setOpen] = createSignal(false)
    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
            >
                Open sheet
            </button>
            <Sheet
                open={open()}
                onClose={() => setOpen(false)}
                label="Share"
            >
                <div class="flex flex-col gap-4 p-5">
                    <h2 class="text-title3 font-semibold">
                        Share
                    </h2>
                    <p>Choose who can see this.</p>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                    >
                        Done
                    </button>
                </div>
            </Sheet>
        </>
    )
}

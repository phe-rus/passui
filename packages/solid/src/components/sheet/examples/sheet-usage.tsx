import { createSignal } from "solid-js"
import { Sheet } from "@passui/solid/sheet"
import { Button } from "@passui/solid/button"
export function SheetUsage() {
    const [open, setOpen] = createSignal(false)
    return (
        <>
            <Button
                variant="secondary"
                onClick={() => setOpen(true)}
            >
                About this app
            </Button>
            <Sheet
                open={open()}
                onClose={() => setOpen(false)}
                label="About this app"
            >
                <div class="flex flex-col gap-2 p-6">
                    <h2 class="text-title3 font-semibold text-label">
                        Pass
                    </h2>
                    <p class="text-callout text-label-secondary">
                        Version 2.4. Made in Lisbon.
                    </p>
                </div>
            </Sheet>
        </>
    )
}

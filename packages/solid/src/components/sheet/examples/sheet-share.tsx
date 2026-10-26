import { createSignal } from "solid-js"
import { Sheet } from "@passui/solid/sheet"
import { Button } from "@passui/solid/button"

export function SheetShare() {
    const [open, setOpen] = createSignal(false)
    const [copied, setCopied] = createSignal(false)
    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Share project
            </Button>
            <Sheet
                open={open()}
                onClose={() => setOpen(false)}
                label="Share project"
            >
                <div class="grid gap-4 p-5">
                    <h2 class="text-title3 font-semibold">
                        Share project
                    </h2>
                    <p class="text-subheadline">
                        Anyone with the link can view this
                        project.
                    </p>
                    <Button
                        variant="secondary"
                        onClick={() => setCopied(true)}
                    >
                        {copied()
                            ? "Link copied"
                            : "Copy share link"}
                    </Button>
                    <Button onClick={() => setOpen(false)}>
                        Done
                    </Button>
                </div>
            </Sheet>
        </>
    )
}

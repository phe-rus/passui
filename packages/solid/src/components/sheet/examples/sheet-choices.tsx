import { createSignal } from "solid-js"
import { Sheet } from "@passui/solid/sheet"
import { Button } from "@passui/solid/button"

export function SheetChoices() {
    const [open, setOpen] = createSignal(false)
    const [visibility, setVisibility] =
        createSignal("Private")
    return (
        <>
            <Button
                variant="secondary"
                onClick={() => setOpen(true)}
            >
                Visibility: {visibility()}
            </Button>
            <Sheet
                open={open()}
                onClose={() => setOpen(false)}
                label="Choose visibility"
            >
                <div class="grid gap-3 p-5">
                    <h2 class="text-title3 font-semibold">
                        Who can see this?
                    </h2>
                    {["Private", "Team", "Public"].map(
                        (item) => (
                            <button
                                type="button"
                                class="rounded-xl bg-fill p-3 text-left"
                                onClick={() => {
                                    setVisibility(item)
                                    setOpen(false)
                                }}
                            >
                                {item}
                            </button>
                        )
                    )}
                </div>
            </Sheet>
        </>
    )
}

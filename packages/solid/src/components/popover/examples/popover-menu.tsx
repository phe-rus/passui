import { createSignal } from "solid-js"
import { Popover } from "@passui/solid/popover"

export function PopoverMenu() {
    const [open, setOpen] = createSignal(false)
    const [choice, setChoice] = createSignal("")
    return (
        <div class="relative">
            <button
                type="button"
                aria-expanded={open()}
                onClick={() => setOpen(!open())}
            >
                Project actions ▾
            </button>
            <Popover
                open={open()}
                class="top-full mt-2 w-56 p-2"
            >
                <div class="grid gap-1">
                    {["Duplicate", "Pin", "Archive"].map(
                        (label) => (
                            <button
                                type="button"
                                class="rounded-lg p-2 text-left hover:bg-fill"
                                onClick={() => {
                                    setChoice(label)
                                    setOpen(false)
                                }}
                            >
                                {label}
                            </button>
                        )
                    )}
                </div>
            </Popover>
            <output class="ml-3 text-footnote">
                {choice()}
            </output>
        </div>
    )
}

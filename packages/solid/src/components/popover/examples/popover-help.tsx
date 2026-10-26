import { createSignal } from "solid-js"
import { Popover } from "@passui/solid/popover"

export function PopoverHelp() {
    const [open, setOpen] = createSignal(false)
    return (
        <div class="relative">
            <button
                type="button"
                aria-expanded={open()}
                onClick={() => setOpen(!open())}
            >
                What is this? ⓘ
            </button>
            <Popover
                open={open()}
                class="top-full mt-2 w-64 rounded-2xl bg-elevated p-4"
            >
                <strong class="text-footnote">
                    Shared workspace
                </strong>
                <p class="mt-1 text-footnote text-label-secondary">
                    Anyone you invite can collaborate on this
                    project.
                </p>
            </Popover>
        </div>
    )
}

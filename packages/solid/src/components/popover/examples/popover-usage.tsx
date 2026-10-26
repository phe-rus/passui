/** @jsxImportSource solid-js */
import { createSignal } from "solid-js"
import { Popover } from "@passui/solid/popover"
export function PopoverUsage() {
    const [open, setOpen] = createSignal(false)
    return (
        <div class="relative">
            <button
                type="button"
                aria-expanded={open()}
                onClick={() => setOpen((value) => !value)}
            >
                Show details
            </button>
            <Popover
                open={open()}
                class="top-full mt-2 w-64 p-4"
            >
                <p>Useful details beside the control.</p>
            </Popover>
        </div>
    )
}

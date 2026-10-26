import { createSignal, For } from "solid-js"
import { Popover } from "@passui/solid/popover"
import { Button } from "@passui/solid/button"
import { toast } from "@passui/solid/toast"

const actions = [
    "Duplicate",
    "Move to folder",
    "Export as PDF",
]

export function PopoverMenu() {
    const [open, setOpen] = createSignal(false)
    return (
        <div class="relative">
            <Button
                variant="secondary"
                aria-haspopup="menu"
                aria-expanded={open()}
                onClick={() => setOpen(!open())}
            >
                More
            </Button>
            <Popover
                open={open()}
                origin="top-right"
                role="menu"
                class="top-full right-0 mt-2 flex w-56 flex-col p-1.5"
            >
                <For each={actions}>
                    {(action) => (
                        <button
                            type="button"
                            role="menuitem"
                            class="rounded-3xl px-3 py-2 text-start text-subheadline text-label hover:bg-fill"
                            onClick={() => {
                                setOpen(false)
                                toast(action)
                            }}
                        >
                            {action}
                        </button>
                    )}
                </For>
            </Popover>
        </div>
    )
}

import { createSignal } from "solid-js"
import { Popover } from "@passui/solid/popover"
import { Button } from "@passui/solid/button"
export function PopoverUsage() {
    const [open, setOpen] = createSignal(false)
    return (
        <div class="relative">
            <Button
                variant="secondary"
                aria-expanded={open()}
                onClick={() => setOpen(!open())}
            >
                What's this?
            </Button>
            <Popover
                open={open()}
                class="top-full left-0 mt-2 w-64 p-4"
            >
                <p class="text-callout text-label">
                    A passkey signs you in with your face,
                    fingerprint or screen lock.
                </p>
            </Popover>
        </div>
    )
}

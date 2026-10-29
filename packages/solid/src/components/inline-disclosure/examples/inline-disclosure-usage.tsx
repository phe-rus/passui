import { createSignal } from "solid-js"
import { InlineDisclosure } from "@passui/solid/inline-disclosure"

export function InlineDisclosureUsage() {
    const [open, setOpen] = createSignal(false)
    return (
        <section>
            <button
                type="button"
                aria-expanded={open()}
                onClick={() => setOpen(!open())}
            >
                Details
            </button>
            <InlineDisclosure open={open()}>
                <p>More information about this setting.</p>
            </InlineDisclosure>
        </section>
    )
}

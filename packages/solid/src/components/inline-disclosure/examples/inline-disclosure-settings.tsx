import { createSignal } from "solid-js"
import { InlineDisclosure } from "@passui/solid/inline-disclosure"

export function InlineDisclosureSettings() {
    const [open, setOpen] = createSignal(false)
    return (
        <section aria-label="Advanced settings">
            <button
                type="button"
                aria-expanded={open()}
                onClick={() => setOpen(!open())}
            >
                Advanced
            </button>
            <InlineDisclosure open={open()}>
                <p>Additional controls appear here.</p>
            </InlineDisclosure>
        </section>
    )
}

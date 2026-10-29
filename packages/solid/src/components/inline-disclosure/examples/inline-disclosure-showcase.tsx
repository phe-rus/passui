import { createSignal } from "solid-js"
import { InlineDisclosure } from "@passui/solid/inline-disclosure"

export function InlineDisclosureShowcase() {
    const [open, setOpen] = createSignal(true)
    return (
        <section aria-label="Profile">
            <button
                type="button"
                aria-expanded={open()}
                onClick={() => setOpen(!open())}
            >
                Personal information
            </button>
            <InlineDisclosure open={open()}>
                <p>
                    Change what your profile shares with
                    others.
                </p>
            </InlineDisclosure>
        </section>
    )
}

import { createSignal } from "solid-js"
import { InlineDisclosure } from "@passui/solid/inline-disclosure"

export function InlineDisclosureDetails() {
    const [open, setOpen] = createSignal(false)
    return (
        <section>
            <button
                type="button"
                aria-expanded={open()}
                onClick={() => setOpen(!open())}
            >
                Read details
            </button>
            <InlineDisclosure open={open()}>
                <p>
                    Details can span multiple lines without a
                    sudden layout jump.
                </p>
            </InlineDisclosure>
        </section>
    )
}

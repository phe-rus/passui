import type { statusIndicatorDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const statusIndicatorContent: ComponentContent<
    typeof statusIndicatorDocs
> = {
    summary:
        "A small dot and text that say whether something is saved, syncing or offline.",
    usage: "Use it near the thing it describes, like a document or a device, to show its live state.",
    propDescriptions: {
        state: "Saved is green, syncing pulses amber, offline is grey.",
        children: "The text that says the state in words.",
    },
    examples: {
        states: {
            title: "Every state",
            description:
                "Saved is green, syncing is amber and pulses, offline is grey.",
        },
        live: {
            title: "Following a save",
            description:
                "The indicator moves from syncing to saved as a change goes through.",
        },
    },
    anatomy: [
        {
            element: "Dot",
            description:
                "The colour of the state; syncing pulses.",
            required: true,
        },
        {
            element: "Text",
            description: "The state in words.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Say the state in words; the dot only supports them.",
        },
        {
            kind: "do",
            text: "Add detail when it helps, like Syncing 12 notes.",
        },
        {
            kind: "dont",
            text: "Use it for errors that need action; show a message with a way to fix it.",
        },
    ],
    accessibility: [
        "The text carries the meaning, so colour is never the only signal.",
        "The pulse stops when Reduce Motion is on.",
    ],
}

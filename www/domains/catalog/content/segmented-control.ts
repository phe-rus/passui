import type { segmentedControlDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const segmentedControlContent: ComponentContent<
    typeof segmentedControlDocs
> = {
    summary:
        "A row of two to five options where exactly one is chosen, that turns into a Picker when it runs out of room.",
    usage: "Use it to switch between views or modes of the same content, like Day, Week and Month.",
    propDescriptions: {
        label: "Names the group for screen readers.",
    },
    examples: {
        views: {
            title: "Switching views",
            description:
                "Choose how the same content is shown; the content below follows at once.",
        },
        overflow: {
            title: "Too many to fit",
            description:
                "When its labels don't fit the width, it turns into a Picker by itself. Narrow the frame to see it.",
        },
    },
    anatomy: [
        {
            element: "Track",
            description:
                "The rounded row holding the options.",
            required: true,
        },
        {
            element: "Segment",
            description:
                "One option; the chosen one sits on a raised surface.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Keep labels to one short word each.",
        },
        {
            kind: "do",
            text: "Change the view at once when a segment is chosen.",
        },
        {
            kind: "dont",
            text: "Use more than five options; reach for a Picker instead.",
        },
    ],
    accessibility: [
        "Works like a radio group: arrow keys move between options.",
        "When it turns into a Picker it stays fully usable from the keyboard.",
    ],
}

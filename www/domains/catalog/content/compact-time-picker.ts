import type { compactTimePickerDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const compactTimePickerContent: ComponentContent<
    typeof compactTimePickerDocs
> = {
    summary:
        "A time shown as a compact button that opens columns of hours and minutes, on the clock people read where they live.",
    usage: "Use it beside CompactDatePicker for when something happens, such as an event's start and end. It never opens the system's time dialog.",
    propDescriptions: {
        label: "Names the button and the panel for assistive technology.",
        locale: "Chooses a 12 hour clock with the local words for AM and PM, or a 24 hour clock.",
    },
    examples: {},
    anatomy: [
        {
            element: "Button",
            description:
                "Shows the chosen time in the locale's format.",
            required: true,
        },
        {
            element: "Columns",
            description:
                "Hours, minutes in steps, and AM or PM where the locale uses them.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Pass the person's own locale, so the clock matches their phone.",
        },
        {
            kind: "do",
            text: "Set minuteStep to what the task needs; an exact time already chosen stays on offer.",
        },
        {
            kind: "dont",
            text: "Use it for durations or timers. It chooses a time of day.",
        },
    ],
    accessibility: [
        "Each column is a listbox; Up and Down move through it and Tab moves between columns.",
        "The panel is a dialog named by the label; Escape closes it and returns focus to the button.",
    ],
}

import type { compactDatePickerDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const compactDatePickerContent: ComponentContent<
    typeof compactDatePickerDocs
> = {
    summary:
        "A date shown as a compact button that opens a month calendar, like the compact DatePicker on iPhone.",
    usage: "Use it for dates people pick from a calendar, such as an event, a trip or an invoice's due date. For dates people know by heart, like a birthday, use DatePicker.",
    propDescriptions: {
        label: "Names the button and the calendar for assistive technology.",
        locale: "Sets the date format, the month names and the day each week starts on.",
    },
    examples: {},
    anatomy: [
        {
            element: "Button",
            description:
                "Shows the chosen date in the locale's format, or the placeholder.",
            required: true,
        },
        {
            element: "Month calendar",
            description:
                "A glass panel with the month, previous and next buttons, and six weeks of days.",
            required: true,
        },
        {
            element: "Remove date",
            description:
                "Shown when labels.clear is given and a date is chosen, for optional dates.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Pass the person's own locale, so weeks start on the day they expect.",
        },
        {
            kind: "do",
            text: "Give labels.clear for optional dates, so a date can be removed again.",
        },
        {
            kind: "dont",
            text: "Use it for a birthday. Paging back decades is slow; DatePicker's fields are faster.",
        },
    ],
    accessibility: [
        "The calendar is a dialog holding a grid; arrow keys move by day and week, Page Up and Page Down by month (with Shift, by year), and Escape closes it.",
        "Each day is read as a full date, today is marked aria-current, and the chosen day aria-selected.",
        "Focus returns to the button after choosing or closing.",
    ],
}

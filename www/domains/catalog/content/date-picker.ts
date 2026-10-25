import type { datePickerDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const datePickerContent: ComponentContent<
    typeof datePickerDocs
> = {
    summary:
        "Day, month and year fields for dates people already know, like a birthday, in the order their locale writes them.",
    usage: "Use it for remembered dates such as birthdays, where typing is faster than paging through a calendar.",
    propDescriptions: {
        label: "Names the whole date, above the three fields.",
        locale: "Sets the field order: month first in the United States, year first in China and Japan.",
    },
    examples: {
        locales: {
            title: "Field order by locale",
            description:
                "The same date in three locales. Each one puts day, month and year where people expect them.",
        },
        "past-only": {
            title: "Dates in the past only",
            description:
                "With max set to today, a future date shows the invalid message and saves nothing.",
        },
    },
    anatomy: [
        {
            element: "Legend",
            description: "The label for the whole date.",
            required: true,
        },
        {
            element: "Day, month and year fields",
            description:
                "Numeric fields, ordered by the locale.",
            required: true,
        },
        {
            element: "Invalid message",
            description:
                "Shown once all three are filled in and the date doesn't exist or is past max.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Pass the person's own locale, so the fields come in the order they write dates.",
        },
        {
            kind: "do",
            text: "Set max for birthdays, so a future date can't be saved.",
        },
        {
            kind: "dont",
            text: "Use it to choose an upcoming date, like a booking. People pick those by looking at a calendar.",
        },
    ],
    accessibility: [
        "The fields sit in a fieldset whose legend is the label, so each field is read with it.",
        "Fields use numeric keyboards and the bday autocomplete tokens, so browsers can fill them in.",
        "An impossible date sets aria-invalid on the fields and announces the message as a status.",
    ],
}

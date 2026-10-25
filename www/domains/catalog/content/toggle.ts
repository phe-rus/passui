import type { toggleDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const toggleContent: ComponentContent<
    typeof toggleDocs
> = {
    summary:
        "An on and off control: a switch for settings that apply at once, or a checkbox for choices you confirm later.",
    usage: "Use the switch when the change takes effect right away. Use the checkbox inside forms and lists of choices.",
    propDescriptions: {
        style: "Switch for instant settings, checkbox for forms and lists.",
        disabled:
            "Shown but not changeable, as iOS dims a switch it cannot change.",
        mixed: "Shows a checkbox as partly on, for a parent of some checked items.",
        labelHidden:
            "Keeps the label for screen readers when a nearby row already shows it.",
        label: "What it turns on or off.",
    },
    examples: {
        settings: {
            title: "Settings rows",
            description:
                "Switches in a Section, each row naming the setting.",
        },
        checkboxes: {
            title: "Checkbox list",
            description:
                "A parent checkbox that is mixed while only some tasks are done.",
        },
    },
    anatomy: [
        {
            element: "Control",
            description: "The switch track or checkbox.",
            required: true,
        },
        {
            element: "Label",
            description:
                "What the toggle controls; can be hidden when the row shows it.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Label the setting, not the state: Wi-Fi, not Turn Wi-Fi on.",
        },
        {
            kind: "do",
            text: "Apply a switch's change at once, with no Save button.",
        },
        {
            kind: "dont",
            text: "Use a switch for a choice that needs confirming; use a checkbox.",
        },
    ],
    accessibility: [
        "Built on a native checkbox, so it works with keyboard and screen readers.",
        "Mixed checkboxes report aria-checked as mixed.",
    ],
}

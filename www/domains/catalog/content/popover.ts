import type { popoverDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const popoverContent: ComponentContent<
    typeof popoverDocs
> = {
    summary:
        "A glass panel that springs open from the control that opened it, and moves itself back inside the screen if it would cross an edge.",
    usage: "Use it for a little extra detail or a short menu tied to one control, such as an account card or a More menu. Pair it with useDismiss so Escape and a click outside close it.",
    propDescriptions: {
        origin: "The corner it grows from. Use top-right for controls near the end of a row.",
    },
    examples: {
        menu: {
            title: "Action menu",
            description:
                "A short list of actions under a More button, opening from its top-right corner.",
        },
        help: {
            title: "Help beside a field",
            description:
                "A small info button that explains a setting, without leaving the form.",
        },
    },
    anatomy: [
        {
            element: "Anchor",
            description:
                "A relative parent holding the trigger and the popover. useDismiss watches it.",
            required: true,
        },
        {
            element: "Popover",
            description:
                "The glass panel, placed with className, such as top-full left-0 mt-2.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Set aria-expanded on the trigger, so its state is announced.",
        },
        {
            kind: "do",
            text: "Close it once an action inside is picked.",
        },
        {
            kind: "dont",
            text: "Put a form that needs focus and care in it. Use a Sheet or Dialog.",
        },
    ],
    accessibility: [
        "Give it a role that fits its content, such as menu or dialog, and a name.",
        "useDismiss closes it on Escape or a click outside, and ignores clicks in pop-ups opened from inside.",
    ],
}

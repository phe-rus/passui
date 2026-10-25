import type { tooltipDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const tooltipContent: ComponentContent<
    typeof tooltipDocs
> = {
    summary:
        "A small label that appears on hover for any element with data-tooltip, shown by one host for the whole app.",
    usage: "Render one TooltipHost near the root of the app. Add data-tooltip to any element. IconButton adds its label as a tooltip by itself.",
    propDescriptions: {
        tooltip:
            "The data-tooltip attribute: the words shown on hover.",
    },
    examples: {
        "icon-buttons": {
            title: "Icon buttons",
            description:
                "IconButton's label becomes its tooltip, so icon-only controls explain themselves.",
        },
        shortcuts: {
            title: "Keyboard shortcuts",
            description:
                "Tips that also teach the shortcut, on a formatting toolbar.",
        },
    },
    anatomy: [
        {
            element: "TooltipHost",
            description:
                "One listener for the whole app that draws the tip.",
            required: true,
        },
        {
            element: "data-tooltip",
            description:
                "The attribute on the element that needs a tip.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Keep tips to a few words that name what a control does.",
        },
        {
            kind: "do",
            text: "Rely on tooltips only for icon buttons, whose labels are otherwise hidden.",
        },
        {
            kind: "dont",
            text: "Put important information only in a tooltip. Touch screens never show them.",
        },
    ],
    accessibility: [
        "Tips show only on devices that can hover, after a short delay, then at once while moving between controls, as on macOS.",
        "A tooltip isn't a label: give the element its own accessible name too. IconButton's label does both.",
    ],
}

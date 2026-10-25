import type { iconButtonDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const iconButtonContent: ComponentContent<
    typeof iconButtonDocs
> = {
    summary:
        "A round button that shows only an icon, for toolbars, players and tight rows.",
    usage: "Use it where an icon alone is clear, like play, share or settings. Its label is required and becomes the accessible name and tooltip.",
    propDescriptions: {
        variant:
            "How much it stands out. Ghost suits toolbars; accent marks the one main action.",
        size: "The square size, from extra small to large.",
        isPending:
            "Shows a spinner in place of the icon and ignores presses.",
        disabled: "Dims the button and ignores presses.",
        label: "Names the action for screen readers and the tooltip.",
    },
    examples: {
        variants: {
            title: "Variants",
            description:
                "The same variants as Button, in a round shape.",
        },
        player: {
            title: "Media controls",
            description:
                "A larger accent button in the middle leads; the ghost buttons support it.",
        },
    },
    anatomy: [
        {
            element: "Icon",
            description:
                "The only visible content, sized to the button.",
            required: true,
        },
        {
            element: "Label",
            description:
                "Not shown, but read aloud and used as the tooltip.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Use icons people already know: play, share, close, more.",
        },
        {
            kind: "do",
            text: "Write the label as the action: Share, not Share icon.",
        },
        {
            kind: "dont",
            text: "Use an icon button for an action people would not recognise without words.",
        },
    ],
    accessibility: [
        "The label becomes aria-label and a tooltip, so the action is named for everyone.",
        "Pressed with Space or Enter, with the accent focus ring.",
    ],
}

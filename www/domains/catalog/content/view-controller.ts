import type { viewControllerDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const viewControllerContent: ComponentContent<
    typeof viewControllerDocs
> = {
    summary:
        "The frame of one screen: a large title with an optional description and action, then the screen's content.",
    usage: "Use it as the outermost part of a screen, passing ViewController.Heading as the heading.",
    propDescriptions: {
        title: "The title prop of ViewController.Heading: the screen's name, as its h1.",
        description:
            "The description prop of ViewController.Heading: one line on what the screen is for.",
        size: "The size prop of ViewController.Heading. Compact centers a smaller title, for sign-in style screens.",
    },
    examples: {
        action: {
            title: "Heading with an action",
            description:
                "A button beside the title for the screen's main action.",
        },
        settings: {
            title: "A settings screen",
            description:
                "The default heading over grouped sections, the shape of most account screens.",
        },
    },
    anatomy: [
        {
            element: "ViewController",
            description:
                "The screen's article, centered with room around it.",
            required: true,
        },
        {
            element: "ViewController.Heading",
            description:
                "The title, plus an optional description and action.",
            required: true,
        },
        {
            element: "Content",
            description: "Everything the screen shows.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Use one per screen, so each screen has exactly one h1.",
        },
        {
            kind: "do",
            text: "Use the compact size for focused flows such as sign in or two-step verification.",
        },
        {
            kind: "dont",
            text: "Put more than one action in the heading. Move the rest into the content.",
        },
    ],
    accessibility: [
        "The title is the page's h1, so screen reader users can jump straight to it.",
        "The screen is an article, with its heading in a section before the content.",
    ],
}

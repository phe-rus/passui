import type { ambientDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const ambientContent: ComponentContent<
    typeof ambientDocs
> = {
    summary:
        "Content with its image's colors glowing softly behind it, the way Apple lets a photo light its surroundings.",
    usage: "Use it behind a hero image, such as a profile photo, album art or an app icon, to tie the page to the picture without a card or edge.",
    propDescriptions: {
        image: "The src prop: the image whose colors glow. Leave it out and nothing glows.",
    },
    examples: {
        images: {
            title: "One glow per image",
            description:
                "Each picture lights its own space. The glow is smaller and dimmer in dark mode.",
        },
        "now-playing": {
            title: "Now playing",
            description:
                "Album art lighting the player around it, the way Music does.",
        },
    },
    anatomy: [
        {
            element: "Ambient",
            description:
                "The section that holds the content and the glow.",
            required: true,
        },
        {
            element: "Glow",
            description:
                "A blurred, faded copy of src, centered a little above the middle.",
        },
        {
            element: "Content",
            description:
                "Your own image and text, drawn above the glow.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Pass the same image you show, so the glow matches it.",
        },
        {
            kind: "do",
            text: "Leave room around the content. The glow needs space to fade out.",
        },
        {
            kind: "dont",
            text: "Put text that must be read straight over the brightest part of the glow.",
        },
    ],
    accessibility: [
        "The glow is decorative: hidden from screen readers, with an empty alt.",
        "It fades in once. Give your own images their alt text.",
    ],
}

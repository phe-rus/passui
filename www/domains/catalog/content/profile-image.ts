import type { profileImageDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const profileImageContent: ComponentContent<
    typeof profileImageDocs
> = {
    summary:
        "A round photo of a person that falls back to their initials while it loads or if it fails.",
    usage: "Use it wherever a person appears: account menus, member lists, comments. Size it with a class name.",
    propDescriptions: {
        size: "Set with a size class on ProfileImage, such as size-7, size-11 or size-20.",
        photo: "Whether a ProfileImageContent with a src is inside.",
        initials:
            "The children of ProfileImageFallback, shown until the photo loads.",
    },
    examples: {
        fallbacks: {
            title: "Fallbacks",
            description:
                "A photo, a broken link, and no photo at all. The last two show initials.",
        },
        group: {
            title: "Stacked group",
            description:
                "Overlapping images with a ring in the background color, and a count for the rest.",
        },
    },
    anatomy: [
        {
            element: "ProfileImage",
            description:
                "The round frame. Its class name sets the size.",
            required: true,
        },
        {
            element: "ProfileImageContent",
            description:
                "The photo. Renders nothing without a src.",
        },
        {
            element: "ProfileImageFallback",
            description:
                "Initials, hidden once the photo has loaded.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Always give a fallback, so a slow or missing photo never leaves an empty circle.",
        },
        {
            kind: "do",
            text: "Show the person's name next to it, or label the button that holds it.",
        },
        {
            kind: "dont",
            text: "Use it for logos or app icons. Those aren't round and have no initials.",
        },
    ],
    accessibility: [
        "The photo has an empty alt by default, because the person's name is shown or labelled nearby.",
        "Give ProfileImageContent a real alt when the image stands alone.",
    ],
}

import { jsxText } from "../../docs/snippet"
import { defineDocs } from "../../docs/types"
import { ProfileImageFallbacks } from "./examples/profile-image-fallbacks"
import { ProfileImageGroup } from "./examples/profile-image-group"
import { ProfileImageShowcase } from "./examples/profile-image-showcase"
import { ProfileImageUsage } from "./examples/profile-image-usage"
import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "./profile-image"

// Size is a class name on ProfileImage, and the photo and initials are
// its children; the snippet writes all three itself.
type DemoProps = {
    size: "small" | "medium" | "large"
    photo: boolean
    initials: string
}

const sizes = {
    small: "size-7",
    medium: "size-11",
    large: "size-20 text-title3",
}

export const profileImageDocs = defineDocs<DemoProps>()({
    slug: "profile-image",
    name: "ProfileImage",
    importPath: "@passui/react/profile-image",
    controls: {
        size: {
            kind: "select",
            options: {
                small: true,
                medium: true,
                large: true,
            },
            default: "medium",
        },
        photo: { kind: "boolean", default: true },
        initials: { kind: "text", default: "AK" },
    },
    render: ({ size, photo, initials }) => (
        <ProfileImage className={sizes[size]}>
            <ProfileImageContent
                src={photo ? "/avatars/aiko.svg" : undefined}
            />
            <ProfileImageFallback>
                {initials}
            </ProfileImageFallback>
        </ProfileImage>
    ),
    childrenSnippet: ({ size, photo, initials }) => ({
        imports: [
            'import { ProfileImageContent, ProfileImageFallback } from "@passui/react/profile-image"',
        ],
        omit: ["size", "photo", "initials"],
        extraProps: { className: sizes[size] },
        children: [
            "",
            ...(photo
                ? [
                      '    <ProfileImageContent src="/avatars/aiko.svg" />',
                  ]
                : []),
            `    <ProfileImageFallback>${jsxText(initials)}</ProfileImageFallback>`,
            "",
        ].join("\n"),
    }),
    usage: ProfileImageUsage,
    showcase: ProfileImageShowcase,
    examples: [
        {
            id: "fallbacks",
            component: ProfileImageFallbacks,
            playground: { photo: false },
        },
        { id: "group", component: ProfileImageGroup },
    ],
})

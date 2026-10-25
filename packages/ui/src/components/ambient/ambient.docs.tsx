import { AmbientNowPlaying } from "./examples/ambient-now-playing"
import { Ambient } from "./ambient"
import { defineDocs } from "../../docs/types"
import { AmbientImages } from "./examples/ambient-images"
import { AmbientShowcase } from "./examples/ambient-showcase"
import { AmbientUsage } from "./examples/ambient-usage"

// src is any image URL; the playground offers the three sample images.
type DemoProps = {
    image: "aiko" | "kenji" | "mira" | "none"
}

export const ambientDocs = defineDocs<DemoProps>()({
    slug: "ambient",
    name: "Ambient",
    importPath: "@passui/react/ambient",
    controls: {
        image: {
            kind: "select",
            options: {
                aiko: true,
                kenji: true,
                mira: true,
                none: true,
            },
            default: "aiko",
        },
    },
    render: ({ image }) => (
        <Ambient
            key={image}
            src={
                image === "none"
                    ? undefined
                    : `/avatars/${image}.svg`
            }
            className="flex w-72 flex-col items-center gap-3 py-12 text-center"
        >
            <img
                src={
                    image === "none"
                        ? "/avatars/aiko.svg"
                        : `/avatars/${image}.svg`
                }
                alt=""
                className="size-24 rounded-3xl shadow-sm"
            />
            <p className="text-headline font-semibold text-label">
                Now playing
            </p>
        </Ambient>
    ),
    childrenSnippet: ({ image }) => ({
        imports: [],
        omit: ["image"],
        extraProps:
            image === "none"
                ? undefined
                : { src: `/avatars/${image}.svg` },
        children: `\n    <img src="/avatars/${image === "none" ? "aiko" : image}.svg" alt="" />\n`,
    }),
    usage: AmbientUsage,
    showcase: AmbientShowcase,
    examples: [
        { id: "images", component: AmbientImages },
        { id: "now-playing", component: AmbientNowPlaying },
    ],
})

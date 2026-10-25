import { ContentViewHeaderAction } from "./examples/content-view-header-action"
import { jsxAttribute } from "../../docs/snippet"
import { defineDocs } from "../../docs/types"
import {
    ContentView,
    type ContentViewVariant,
} from "./content-view"
import { ContentViewShowcase } from "./examples/content-view-showcase"
import { ContentViewStats } from "./examples/content-view-stats"
import { ContentViewUsage } from "./examples/content-view-usage"

// heading and description belong to ContentView.Header, inside the card;
// the snippet writes that header itself.
type DemoProps = {
    variant?: ContentViewVariant
    heading: string
    description: string
}

export const contentViewDocs = defineDocs<DemoProps>()({
    slug: "content-view",
    name: "ContentView",
    importPath: "@passui/react/content-view",
    controls: {
        variant: {
            kind: "select",
            options: { elevated: true },
            default: "elevated",
        },
        heading: { kind: "text", default: "Recovery" },
        description: {
            kind: "text",
            default: "Ways back in if you lose your phone.",
        },
    },
    render: ({ variant, heading, description }) => (
        <ContentView variant={variant} className="w-72 p-5">
            <ContentView.Header
                heading={heading}
                p={description || undefined}
                className="flex flex-col gap-1"
                pClassName="text-footnote text-label-secondary"
            />
        </ContentView>
    ),
    childrenSnippet: ({ heading, description }) => ({
        imports: [],
        omit: ["heading", "description"],
        extraProps: { className: "p-5" },
        children: `\n    <ContentView.Header ${jsxAttribute("heading", heading)}${description ? ` ${jsxAttribute("p", description)}` : ""} />\n`,
    }),
    usage: ContentViewUsage,
    showcase: ContentViewShowcase,
    examples: [
        { id: "stats", component: ContentViewStats },
        {
            id: "header-action",
            component: ContentViewHeaderAction,
        },
    ],
})

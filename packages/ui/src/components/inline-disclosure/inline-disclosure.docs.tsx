import { defineDocs } from "../../docs/types"
import { InlineDisclosure } from "./inline-disclosure"
import { InlineDisclosureUsage } from "./examples/inline-disclosure-usage"
import { InlineDisclosureShowcase } from "./examples/inline-disclosure-showcase"
import { InlineDisclosureSettings } from "./examples/inline-disclosure-settings"
import { InlineDisclosureDetails } from "./examples/inline-disclosure-details"

export const inlineDisclosureDocs = defineDocs<{ open: boolean; children?: string }>()({
    slug: "inline-disclosure",
    name: "InlineDisclosure",
    importPath: "@passui/react/inline-disclosure",
    controls: {
        open: { kind: "boolean", default: true },
        children: { kind: "text", default: "Additional details" },
    },
    render: ({ open, children }) => (
        <InlineDisclosure open={open}>
            <p className="p-4 text-subheadline text-label-secondary">{children}</p>
        </InlineDisclosure>
    ),
    usage: InlineDisclosureUsage,
    showcase: InlineDisclosureShowcase,
    examples: [
        { id: "settings", component: InlineDisclosureSettings },
        { id: "details", component: InlineDisclosureDetails },
    ],
})

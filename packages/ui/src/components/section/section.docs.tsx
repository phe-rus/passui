import { SectionActions } from "./examples/section-actions"
import { SectionGroups } from "./examples/section-groups"
import { defineDocs } from "../../docs/types"
import { LabeledContent } from "../labeled-content/labeled-content"
import { SectionShowcase } from "./examples/section-showcase"
import { SectionUsage } from "./examples/section-usage"
import { Section } from "./section"

type DemoProps = { title?: string; footer?: string }

export const sectionDocs = defineDocs<DemoProps>()({
    slug: "section",
    name: "Section",
    importPath: "@passui/react",
    controls: {
        title: { kind: "text", default: "Account" },
        footer: {
            kind: "text",
            default: "Your name appears on shared notes.",
        },
    },
    render: (values) => (
        <div className="w-full max-w-sm">
            <Section {...values}>
                <LabeledContent label="Name">
                    <span className="text-subheadline text-label-secondary">
                        Aiko Kamado
                    </span>
                </LabeledContent>
                <LabeledContent label="Email">
                    <span className="text-subheadline text-label-secondary">
                        aiko@example.com
                    </span>
                </LabeledContent>
            </Section>
        </div>
    ),
    childrenSnippet: () => ({
        imports: [
            'import { LabeledContent } from "@passui/react"',
        ],
        children:
            '<LabeledContent label="Name">Aiko Kamado</LabeledContent>',
    }),
    usage: SectionUsage,
    showcase: SectionShowcase,
    examples: [
        { id: "groups", component: SectionGroups },
        { id: "actions", component: SectionActions },
    ],
})

import { Breadcrumb } from "@passui/react/breadcrumb"
import { defineDocs } from "../types"
import { BreadcrumbUsage } from "./examples/breadcrumb-usage"
import { BreadcrumbShowcase } from "./examples/breadcrumb-showcase"
import { BreadcrumbShort } from "./examples/breadcrumb-short"
import { BreadcrumbCurrent } from "./examples/breadcrumb-current"

export const breadcrumbDocs = defineDocs<{ label: string }>()({
    slug: "breadcrumb",
    name: "Breadcrumb",
    importPath: "@passui/react/breadcrumb",
    controls: { label: { kind: "text", default: "Breadcrumb", required: true } },
    render: (props) => (
        <Breadcrumb
            {...props}
            items={[{ label: "Docs", href: "/docs/introduction" }, { label: "Components" }]}
        />
    ),
    childrenSnippet: () => ({
        imports: [],
        children: "",
        expressionProps: {
            items: '[{ label: "Docs", href: "/docs/introduction" }, { label: "Components" }]',
        },
    }),
    usage: BreadcrumbUsage,
    showcase: BreadcrumbShowcase,
    examples: [
        { id: "short", component: BreadcrumbShort },
        { id: "current", component: BreadcrumbCurrent },
    ],
})

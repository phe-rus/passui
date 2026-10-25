import { TabViewSettings } from "./examples/tab-view-settings"
import { defineDocs } from "../../docs/types"
import { TabViewKeyboard } from "./examples/tab-view-keyboard"
import { TabViewShowcase } from "./examples/tab-view-showcase"
import { TabViewUsage } from "./examples/tab-view-usage"
import { TabView } from "./tab-view"

// TabView is generic over its tab values, so the docs name the three
// tabs the playground shows.
type DemoProps = {
    label: string
    defaultValue: "overview" | "activity" | "settings"
}

const options = [
    { value: "overview", label: "Overview" },
    { value: "activity", label: "Activity" },
    { value: "settings", label: "Settings" },
] as const

export const tabViewDocs = defineDocs<DemoProps>()({
    slug: "tab-view",
    name: "TabView",
    importPath: "@passui/react/tab-view",
    controls: {
        label: {
            kind: "text",
            default: "Project",
            required: true,
        },
        defaultValue: {
            kind: "select",
            options: {
                overview: true,
                activity: true,
                settings: true,
            },
            default: "overview",
        },
    },
    render: ({ label, defaultValue }) => (
        <div className="w-full max-w-sm">
            <TabView
                key={defaultValue}
                label={label}
                options={options}
                defaultValue={defaultValue}
            >
                {(value) => (
                    <p className="text-center text-callout text-label-secondary">
                        The {value} panel.
                    </p>
                )}
            </TabView>
        </div>
    ),
    childrenSnippet: ({ defaultValue }) => ({
        imports: [],
        children: [
            "",
            "    {(value) => <p>The {value} panel.</p>}",
            "",
        ].join("\n"),
        omit: ["defaultValue"],
        extraProps: { defaultValue },
        expressionProps: {
            options:
                '[{ value: "overview", label: "Overview" }, { value: "activity", label: "Activity" }, { value: "settings", label: "Settings" }]',
        },
    }),
    usage: TabViewUsage,
    showcase: TabViewShowcase,
    examples: [
        { id: "keyboard", component: TabViewKeyboard },
        { id: "settings", component: TabViewSettings },
    ],
})

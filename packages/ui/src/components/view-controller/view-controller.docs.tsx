import { ViewControllerSettings } from "./examples/view-controller-settings"
import { Button } from "../button/button"
import { jsxAttribute } from "../../docs/snippet"
import { defineDocs } from "../../docs/types"
import { ViewControllerAction } from "./examples/view-controller-action"
import { ViewControllerShowcase } from "./examples/view-controller-showcase"
import { ViewControllerUsage } from "./examples/view-controller-usage"
import { ViewController } from "./view-controller"

// The controls belong to ViewController.Heading, passed as `heading`;
// the snippet writes that element itself.
type DemoProps = {
    title: string
    description: string
    size: "default" | "compact"
}

export const viewControllerDocs = defineDocs<DemoProps>()({
    slug: "view-controller",
    name: "ViewController",
    importPath: "@passui/react/view-controller",
    controls: {
        title: { kind: "text", default: "Security" },
        description: {
            kind: "text",
            default:
                "Choose how you sign in and which devices stay signed in.",
        },
        size: {
            kind: "select",
            options: { default: true, compact: true },
            default: "default",
        },
    },
    render: ({ title, description, size }) => (
        <ViewController
            className="py-6"
            heading={
                <ViewController.Heading
                    title={title}
                    description={description || undefined}
                    size={size}
                />
            }
        >
            <Button
                variant="secondary"
                className="self-start"
            >
                Change password
            </Button>
        </ViewController>
    ),
    childrenSnippet: ({ title, description, size }) => ({
        imports: [],
        omit: ["title", "description", "size"],
        expressionProps: {
            heading: `<ViewController.Heading ${jsxAttribute("title", title)}${description ? ` ${jsxAttribute("description", description)}` : ""}${size === "compact" ? ' size="compact"' : ""} />`,
        },
        children: "\n    {/* the screen's content */}\n",
    }),
    usage: ViewControllerUsage,
    showcase: ViewControllerShowcase,
    examples: [
        {
            id: "action",
            component: ViewControllerAction,
        },
        { id: "settings", component: ViewControllerSettings },
    ],
})

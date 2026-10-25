import { Button } from "../button/button"
import { jsxText } from "../../docs/snippet"
import { defineDocs } from "../../docs/types"
import { ToastAction } from "./examples/toast-action"
import { ToastPromise } from "./examples/toast-promise"
import { ToastShowcase } from "./examples/toast-showcase"
import { ToastUsage } from "./examples/toast-usage"
import { type ToastTone, toast } from "./toast-store"

// toast is a function, not an element: the playground fires one from a
// button, and the snippet writes that button.
type DemoProps = {
    tone: ToastTone
    title: string
    description: string
}

function show({ tone, title, description }: DemoProps) {
    const options = description ? { description } : undefined
    if (tone === "neutral") toast(title, options)
    else toast[tone](title, options)
}

export const toastDocs = defineDocs<DemoProps>()({
    slug: "toast",
    name: "toast",
    importPath: "@passui/react/toast",
    controls: {
        tone: {
            kind: "select",
            options: {
                neutral: true,
                success: true,
                error: true,
                loading: true,
            },
            default: "success",
        },
        title: {
            kind: "text",
            default: "Changes saved",
        },
        description: { kind: "text", default: "" },
    },
    render: (values) => (
        <Button
            variant="secondary"
            onClick={() => show(values)}
        >
            Show toast
        </Button>
    ),
    childrenSnippet: ({ tone, title, description }) => {
        const call =
            tone === "neutral" ? "toast" : `toast.${tone}`
        const options = description
            ? `, { description: ${JSON.stringify(description)} }`
            : ""
        return {
            imports: [
                'import { Button } from "@passui/react/button"',
            ],
            element: "Button",
            omit: ["tone", "title", "description"],
            extraProps: { variant: "secondary" },
            expressionProps: {
                onClick: `() => ${call}(${JSON.stringify(title)}${options})`,
            },
            children: jsxText("Show toast"),
        }
    },
    usage: ToastUsage,
    showcase: ToastShowcase,
    examples: [
        { id: "action", component: ToastAction },
        { id: "promise", component: ToastPromise },
    ],
    previewHeight: 240,
})
